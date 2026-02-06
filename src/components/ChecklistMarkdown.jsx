import React, { useEffect, useMemo, useState } from 'react';
import { getChecklistState, setChecklistState } from '../utils/storage';

const parseMarkdown = (content) => {
  const lines = content.split(/\r?\n/);
  const blocks = [];
  let currentList = null;

  const flushList = () => {
    if (currentList) {
      blocks.push(currentList);
      currentList = null;
    }
  };

  lines.forEach((rawLine) => {
    const line = rawLine.trimEnd();
    const trimmed = line.trim();
    if (!trimmed) {
      flushList();
      return;
    }

    if (trimmed.startsWith('### ')) {
      flushList();
      blocks.push({ type: 'h3', text: trimmed.slice(4).trim() });
      return;
    }

    if (trimmed.startsWith('## ')) {
      flushList();
      blocks.push({ type: 'h2', text: trimmed.slice(3).trim() });
      return;
    }

    if (trimmed.startsWith('# ')) {
      flushList();
      blocks.push({ type: 'h1', text: trimmed.slice(2).trim() });
      return;
    }

    const checklistMatch = trimmed.match(/^- \[( |x|X)\] (.*)$/);
    if (checklistMatch) {
      const [, checked, text] = checklistMatch;
      if (!currentList || currentList.type !== 'checklist') {
        flushList();
        currentList = { type: 'checklist', items: [] };
      }
      currentList.items.push({ text, checked: checked.toLowerCase() === 'x' });
      return;
    }

    const bulletMatch = trimmed.match(/^- (.*)$/);
    if (bulletMatch) {
      const [, text] = bulletMatch;
      if (!currentList || currentList.type !== 'bullet') {
        flushList();
        currentList = { type: 'bullet', items: [] };
      }
      currentList.items.push({ text });
      return;
    }

    flushList();
    blocks.push({ type: 'p', text: trimmed });
  });

  flushList();
  return blocks;
};

function ChecklistMarkdown({ checklistId, content }) {
  const parsedBlocks = useMemo(() => parseMarkdown(content), [content]);
  const indexedBlocks = useMemo(() => {
    let nextIndex = 0;
    return parsedBlocks.map((block) => {
      if (block.type !== 'checklist') {
        return block;
      }
      return {
        ...block,
        items: block.items.map((item) => ({
          ...item,
          index: nextIndex++
        }))
      };
    });
  }, [parsedBlocks]);
  const taskCount = useMemo(() => {
    return indexedBlocks.reduce(
      (sum, block) => (block.type === 'checklist' ? sum + block.items.length : sum),
      0
    );
  }, [indexedBlocks]);

  const [checks, setChecks] = useState(() => getChecklistState(checklistId));

  useEffect(() => {
    if (taskCount === 0) {
      return;
    }
    setChecks((prev) => {
      if (prev.length === taskCount) {
        return prev;
      }
      const next = Array.from({ length: taskCount }, (_, index) => prev[index] ?? false);
      setChecklistState(checklistId, next);
      return next;
    });
  }, [taskCount, checklistId]);

  const completedCount = useMemo(() => checks.filter(Boolean).length, [checks]);

  const handleToggle = (index, value) => {
    const next = [...checks];
    while (next.length <= index) {
      next.push(false);
    }
    next[index] = value;
    setChecks(next);
    setChecklistState(checklistId, next);
  };

  const handleReset = () => {
    const next = Array(taskCount).fill(false);
    setChecks(next);
    setChecklistState(checklistId, next);
  };

  const ChecklistControls = () => (
    <div className="checklist-footer">
      <div className="checklist-progress">
        {completedCount} of {taskCount} completed
      </div>
      <button type="button" className="checklist-reset" onClick={handleReset}>
        Reset checklist
      </button>
    </div>
  );

  return (
    <div className="checklist-markdown">
      <ChecklistControls />

      {indexedBlocks.map((block, blockIndex) => {
        if (block.type === 'h1') {
          return <h1 key={blockIndex}>{block.text}</h1>;
        }
        if (block.type === 'h2') {
          return <h2 key={blockIndex}>{block.text}</h2>;
        }
        if (block.type === 'h3') {
          return <h3 key={blockIndex}>{block.text}</h3>;
        }
        if (block.type === 'p') {
          return <p key={blockIndex}>{block.text}</p>;
        }
        if (block.type === 'bullet') {
          return (
            <ul key={blockIndex} className="bullet-list">
              {block.items.map((item, index) => (
                <li key={index}>{item.text}</li>
              ))}
            </ul>
          );
        }
        if (block.type === 'checklist') {
          return (
            <ul key={blockIndex} className="checklist-list">
              {block.items.map((item, index) => {
                const checked = checks[item.index] ?? false;
                const inputId = `${checklistId}-${item.index}`;
                return (
                  <li key={index}>
                    <label htmlFor={inputId} className="checklist-label">
                      <input
                        id={inputId}
                        type="checkbox"
                        checked={checked}
                        onChange={(event) => handleToggle(item.index, event.target.checked)}
                      />
                      <span>{item.text}</span>
                    </label>
                  </li>
                );
              })}
            </ul>
          );
        }
        return null;
      })}

      <ChecklistControls />
    </div>
  );
}

export default ChecklistMarkdown;
