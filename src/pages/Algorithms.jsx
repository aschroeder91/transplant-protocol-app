import React from 'react';
import { ChevronLeft, Activity, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { algorithms } from '../data/algorithms';

function Algorithms() {
    return (
        <div className="container p-4">
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1.5rem', gap: '0.5rem' }}>
                <Link to="/tools" style={{ color: 'var(--text-primary)' }}>
                    <ChevronLeft size={24} />
                </Link>
                <h2 className="font-bold" style={{ fontSize: '1.5rem', margin: 0 }}>Algorithms / Paths</h2>
            </div>

            <p style={{ color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                Tap an algorithm to open a guided decision tree or static pathway.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {algorithms.map((algorithm) => (
                    <Link
                        key={algorithm.id}
                        to={`/algorithms/${algorithm.id}`}
                        className="algorithm-list-card"
                    >
                        <div className="algorithm-list-icon">
                            <Activity size={20} />
                        </div>
                        <div style={{ flex: 1 }}>
                            <div className="algorithm-list-title">{algorithm.title}</div>
                            <div className="algorithm-list-subtitle">{algorithm.intro}</div>
                        </div>
                        <ChevronRight size={18} color="var(--text-secondary)" />
                    </Link>
                ))}
                {algorithms.length === 0 && (
                <div className="empty-state">No algorithms available yet.</div>
                )}
            </div>
        </div>
    );
}

export default Algorithms;
