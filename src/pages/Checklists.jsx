import React from 'react';
import { ChevronLeft, CheckSquare } from 'lucide-react';
import { Link } from 'react-router-dom';

function Checklists() {
    return (
        <div className="container p-4">
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1.5rem', gap: '0.5rem' }}>
                <Link to="/tools" style={{ color: 'var(--text-primary)' }}>
                    <ChevronLeft size={24} />
                </Link>
                <h2 className="font-bold" style={{ fontSize: '1.5rem', margin: 0 }}>Checklists</h2>
            </div>

            <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '3rem',
                backgroundColor: 'white',
                borderRadius: 'var(--radius)',
                textAlign: 'center',
                color: 'var(--text-secondary)'
            }}>
                <CheckSquare size={48} style={{ marginBottom: '1rem', opacity: 0.5 }} />
                <h3 style={{ fontSize: '1.2rem', fontWeight: '600', marginBottom: '0.5rem' }}>Coming Soon</h3>
                <p>Interactive checklists for pre-transplant workup and discharge are under development.</p>
            </div>
        </div>
    );
}

export default Checklists;
