import React, { useMemo, useState } from 'react';
import { ChevronLeft, Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cptCodes } from '../data/cptCodes';

function CptCodes() {
  const [filter, setFilter] = useState('');

  const filteredCodes = useMemo(() => {
    const term = filter.trim().toLowerCase();
    if (!term) {
      return cptCodes;
    }
    return cptCodes.filter((item) => {
      return (
        item.code.toLowerCase().includes(term) ||
        item.description.toLowerCase().includes(term) ||
        item.category.toLowerCase().includes(term)
      );
    });
  }, [filter]);

  const groupedCodes = useMemo(() => {
    const map = new Map();
    filteredCodes.forEach((item) => {
      if (!map.has(item.category)) {
        map.set(item.category, []);
      }
      map.get(item.category).push(item);
    });
    return Array.from(map.entries());
  }, [filteredCodes]);

  return (
    <div className="container p-4">
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1.5rem', gap: '0.5rem' }}>
        <Link to="/tools" style={{ color: 'var(--text-primary)' }}>
          <ChevronLeft size={24} />
        </Link>
        <h2 className="font-bold" style={{ fontSize: '1.5rem', margin: 0 }}>CPT Codes</h2>
      </div>

      <div className="filter-bar">
        <Search size={18} />
        <input
          type="text"
          placeholder="Filter by code, description, or category..."
          value={filter}
          onChange={(event) => setFilter(event.target.value)}
        />
      </div>

      {groupedCodes.length === 0 && (
        <div className="empty-state">No CPT codes match your filter.</div>
      )}

      {groupedCodes.map(([category, items]) => (
        <div key={category} className="cpt-category">
          <div className="cpt-category-title">{category}</div>
          <div className="cpt-table">
            {items.map((item, index) => (
              <div
                key={`${item.code}-${index}`}
                className={`cpt-row ${index % 2 === 0 ? 'cpt-row-alt' : ''}`}
              >
                <div className="cpt-code">{item.code}</div>
                <div className="cpt-description">{item.description}</div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default CptCodes;
