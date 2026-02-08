import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Pill } from 'lucide-react';
import SimpleMarkdown from '../components/SimpleMarkdown';
import { getMedicationById } from '../data/medications';

function MedicationView() {
  const { id } = useParams();
  const navigate = useNavigate();
  const medication = getMedicationById(id);

  if (!medication) {
    return <div className="p-4">Medication reference not found.</div>;
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
          <Pill size={18} />
          <span>{medication.title}</span>
        </h1>
        <div style={{ width: 24 }} />
      </div>

      <div style={{ flex: 1, overflowY: 'auto', padding: '1rem' }}>
        {medication.summary && (
          <div className="algorithm-intro">
            <p>{medication.summary}</p>
          </div>
        )}

        {medication.table && (
          <div
            style={{
              backgroundColor: 'white',
              borderRadius: 'var(--radius)',
              boxShadow: 'var(--shadow)',
              border: '1px solid var(--border-color)'
            }}
          >
            <table style={{ width: '100%', borderCollapse: 'collapse', tableLayout: 'fixed' }}>
              {medication.id === 'prophylaxis-after-transplant' && (
                <colgroup>
                  <col style={{ width: '14%' }} />
                  <col style={{ width: '50%' }} />
                  <col style={{ width: '36%' }} />
                </colgroup>
              )}
              <thead>
                <tr style={{ backgroundColor: '#f8fafc' }}>
                  {medication.table.headers.map((header) => (
                    <th
                      key={header}
                      style={{
                        textAlign: 'left',
                        fontWeight: 600,
                        fontSize: '0.9rem',
                        color: 'var(--text-secondary)',
                        padding: '0.75rem 0.9rem',
                        borderBottom: '1px solid var(--border-color)'
                      }}
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {medication.table.rows.map((row, rowIndex) => (
                  <tr key={rowIndex}>
                    {row.map((cell, cellIndex) => (
                      <td
                        key={`${rowIndex}-${cellIndex}`}
                        style={{
                          padding: '0.8rem 0.9rem',
                          borderBottom:
                            rowIndex === medication.table.rows.length - 1
                              ? 'none'
                              : '1px solid var(--border-color)',
                          verticalAlign: 'top',
                          fontSize: '0.92rem',
                          color: 'var(--text-primary)',
                          overflowWrap: 'anywhere'
                        }}
                      >
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {medication.content && (
          <div className="algorithm-card">
            <SimpleMarkdown content={medication.content} />
          </div>
        )}
      </div>
    </div>
  );
}

export default MedicationView;
