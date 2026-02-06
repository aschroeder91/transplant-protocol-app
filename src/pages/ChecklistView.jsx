import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, CheckSquare } from 'lucide-react';
import ChecklistMarkdown from '../components/ChecklistMarkdown';
import { getChecklistById } from '../data/checklists';

function ChecklistView() {
  const { id } = useParams();
  const navigate = useNavigate();
  const checklist = getChecklistById(id);

  if (!checklist) {
    return <div className="p-4">Checklist not found.</div>;
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
            textAlign: 'center',
            margin: '0 1rem',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis'
          }}
        >
          {checklist.title}
        </h1>
        <div style={{ color: 'var(--text-secondary)' }}>
          <CheckSquare size={22} />
        </div>
      </div>

      <div style={{ flex: 1, overflowY: 'auto', padding: '1rem' }}>
        <ChecklistMarkdown checklistId={checklist.id} content={checklist.content} />
      </div>
    </div>
  );
}

export default ChecklistView;
