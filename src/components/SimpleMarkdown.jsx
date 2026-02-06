import React, { useMemo } from 'react';

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

function SimpleMarkdown({ content }) {
  const blocks = useMemo(() => parseMarkdown(content), [content]);

  return (
    <div className="simple-markdown">
      {blocks.map((block, index) => {
        if (block.type === 'h1') {
          return <h1 key={index}>{block.text}</h1>;
        }
        if (block.type === 'h2') {
          return <h2 key={index}>{block.text}</h2>;
        }
        if (block.type === 'h3') {
          return <h3 key={index}>{block.text}</h3>;
        }
        if (block.type === 'p') {
          return <p key={index}>{block.text}</p>;
        }
        if (block.type === 'bullet') {
          return (
            <ul key={index} className="simple-bullet-list">
              {block.items.map((item, itemIndex) => (
                <li key={itemIndex}>{item.text}</li>
              ))}
            </ul>
          );
        }
        return null;
      })}
    </div>
  );
}

export default SimpleMarkdown;
