import React, { useMemo, useState } from 'react';
import { ChevronLeft, FileText, Download, Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import { protocolFiles, getProtocolFileUrl } from '../data/protocolFiles';

function ProtocolFiles() {
  const [filter, setFilter] = useState('');

  const filteredFiles = useMemo(() => {
    const term = filter.trim().toLowerCase();
    if (!term) {
      return protocolFiles;
    }
    return protocolFiles.filter((file) => {
      return (
        file.title.toLowerCase().includes(term) ||
        file.fileName.toLowerCase().includes(term)
      );
    });
  }, [filter]);

  return (
    <div className="container p-4">
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1.5rem', gap: '0.5rem' }}>
        <Link to="/tools" style={{ color: 'var(--text-primary)' }}>
          <ChevronLeft size={24} />
        </Link>
        <h2 className="font-bold" style={{ fontSize: '1.5rem', margin: 0 }}>Protocol Files</h2>
      </div>

      <p style={{ color: 'var(--text-secondary)', marginBottom: '1rem' }}>
        Official PDF references from the protocol binder. Tap a file to download.
      </p>

      <div className="filter-bar">
        <Search size={18} />
        <input
          type="text"
          placeholder="Filter protocol files..."
          value={filter}
          onChange={(event) => setFilter(event.target.value)}
        />
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {filteredFiles.map((file) => (
          <a
            key={file.id}
            href={getProtocolFileUrl(file.fileName)}
            download
            className="protocol-file-card"
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div className="protocol-file-icon">
                <FileText size={22} />
              </div>
              <div>
                <div className="protocol-file-title">{file.title}</div>
                <div className="protocol-file-name">{file.fileName}</div>
              </div>
            </div>
            <Download size={18} color="var(--text-secondary)" />
          </a>
        ))}
        {filteredFiles.length === 0 && (
          <div className="empty-state">No protocol files are available yet.</div>
        )}
      </div>
    </div>
  );
}

export default ProtocolFiles;
