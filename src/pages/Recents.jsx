import React from 'react';
import { Link } from 'react-router-dom';
import { getRecents } from '../utils/storage';
import { Activity, BookOpenText, Calculator, CheckSquare, ChevronRight, Clock, Pill } from 'lucide-react';
import { getTrackableEntryByKey } from '../data/trackableEntries';

function Recents() {
    const recents = getRecents()
        .map((key) => getTrackableEntryByKey(key))
        .filter(Boolean);

    const iconByType = {
        resource: <BookOpenText size={18} />,
        checklist: <CheckSquare size={18} />,
        algorithm: <Activity size={18} />,
        calculator: <Calculator size={18} />,
        medication: <Pill size={18} />
    };

    const colorByType = {
        resource: 'var(--primary-color)',
        checklist: '#f59e0b',
        algorithm: '#ef4444',
        calculator: '#10b981',
        medication: '#8b5cf6'
    };

    return (
        <div className="container p-4">
            <h2 className="font-bold" style={{ fontSize: '1.5rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Clock size={24} />
                Recents
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {recents.map((entry) => (
                    <Link to={entry.path} key={entry.key} style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '1rem',
                        backgroundColor: 'white',
                        borderRadius: 'var(--radius)',
                        boxShadow: 'var(--shadow)'
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                            <div style={{ color: colorByType[entry.type] || 'var(--text-secondary)' }}>
                                {iconByType[entry.type]}
                            </div>
                            <div>
                                <div style={{ fontWeight: '600' }}>{entry.title}</div>
                                <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{entry.subtitle}</div>
                            </div>
                        </div>
                        <ChevronRight size={20} color="var(--text-secondary)" />
                    </Link>
                ))}
                {recents.length === 0 && (
                    <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-secondary)' }}>
                        No recent items yet.
                    </div>
                )}
            </div>
        </div>
    );
}

export default Recents;
