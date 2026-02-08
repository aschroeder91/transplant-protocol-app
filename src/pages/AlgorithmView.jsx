import React, { useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Activity } from 'lucide-react';
import { getAlgorithmById } from '../data/algorithms';
import SimpleMarkdown from '../components/SimpleMarkdown';

function AlgorithmView() {
  const { id } = useParams();
  const navigate = useNavigate();
  const algorithm = getAlgorithmById(id);

  const [path, setPath] = useState(() => {
    if (!algorithm) {
      return [];
    }
    if (algorithm.type === 'path') {
      return [];
    }
    return [algorithm.rootId];
  });

  const currentNode = useMemo(() => {
    if (!algorithm || algorithm.type === 'path' || path.length === 0) {
      return null;
    }
    return algorithm.nodes[path[path.length - 1]];
  }, [algorithm, path]);

  if (!algorithm) {
    return <div className="p-4">Algorithm not found.</div>;
  }

  const handleSelect = (nextId) => {
    setPath((prev) => [...prev, nextId]);
  };

  const handleBack = () => {
    setPath((prev) => (prev.length > 1 ? prev.slice(0, -1) : prev));
  };

  const handleRestart = () => {
    if (algorithm.type === 'path') {
      return;
    }
    setPath([algorithm.rootId]);
  };

  return (
    <div className="container" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <div
        style={{
          padding: '1rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: '1px solid var(--border-color)',
          backgroundColor: 'white',
          position: 'sticky',
          top: 0,
          zIndex: 10
        }}
      >
        <button
          onClick={() => navigate(-1)}
          style={{ display: 'flex', alignItems: 'center', color: 'var(--text-secondary)' }}
        >
          <ArrowLeft size={24} />
        </button>
        <h1
          style={{
            fontSize: '1.05rem',
            fontWeight: '600',
            flex: 1,
            margin: '0 1rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.4rem',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis'
          }}
        >
          <Activity size={18} />
          <span>{algorithm.title}</span>
        </h1>
        <div style={{ width: 24 }} />
      </div>

      <div style={{ flex: 1, overflowY: 'auto', padding: '1rem' }}>
        <div className="algorithm-intro">
          <p>{algorithm.intro}</p>
        </div>

        {algorithm.type === 'path' && (
          <div className="algorithm-card">
            <SimpleMarkdown content={algorithm.content} />
          </div>
        )}

        {algorithm.type !== 'path' && currentNode && (
          <div className="algorithm-card">
            <div className="algorithm-card-title">{currentNode.title}</div>

            {currentNode.type === 'question' && (
              <>
                {currentNode.text && (
                  <div className="algorithm-card-text">{currentNode.text}</div>
                )}
                <div className="algorithm-options">
                  {currentNode.options.map((option) => (
                    <button
                      key={option.nextId}
                      type="button"
                      className="algorithm-option"
                      onClick={() => handleSelect(option.nextId)}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </>
            )}

            {currentNode.type === 'result' && (
              <div className="algorithm-result">
                {currentNode.text && (
                  <div className="algorithm-result-text">{currentNode.text}</div>
                )}
                <div className="algorithm-actions">
                  <button type="button" className="algorithm-secondary" onClick={handleBack}>
                    Back
                  </button>
                  <button type="button" className="algorithm-primary" onClick={handleRestart}>
                    Restart
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {algorithm.type !== 'path' && currentNode?.type === 'question' && path.length > 1 && (
          <div className="algorithm-actions">
            <button type="button" className="algorithm-secondary" onClick={handleBack}>
              Back
            </button>
            <button type="button" className="algorithm-secondary" onClick={handleRestart}>
              Restart
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default AlgorithmView;
