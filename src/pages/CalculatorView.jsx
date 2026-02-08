import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Calculator, ExternalLink } from 'lucide-react';
import { calculators } from '../data/calculators';

function CalculatorView() {
  const { id } = useParams();
  const navigate = useNavigate();
  const calculator = calculators.find((item) => item.id === id);

  if (!calculator) {
    return <div className="p-4">Calculator not found.</div>;
  }

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
          <Calculator size={18} />
          <span>{calculator.name}</span>
        </h1>
        <div style={{ width: 24 }} />
      </div>

      <div style={{ flex: 1, overflowY: 'auto', padding: '1rem' }}>
        <div className="algorithm-intro">
          <p>{calculator.description}</p>
        </div>

        <a
          href={calculator.url}
          target="_blank"
          rel="noopener noreferrer"
          className="protocol-file-card"
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div className="protocol-file-icon" style={{ backgroundColor: '#d1fae5', color: '#059669' }}>
              <Calculator size={22} />
            </div>
            <div>
              <div className="protocol-file-title">Open in MDCalc</div>
              <div className="protocol-file-name">{calculator.url}</div>
            </div>
          </div>
          <ExternalLink size={18} color="var(--text-secondary)" />
        </a>
      </div>
    </div>
  );
}

export default CalculatorView;
