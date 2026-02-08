import React from 'react';
import { Calculator, ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { calculators } from '../data/calculators';

function Calculators() {
    return (
        <div className="container p-4">
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1.5rem', gap: '0.5rem' }}>
                <Link to="/tools" style={{ color: 'var(--text-primary)' }}>
                    <ChevronLeft size={24} />
                </Link>
                <h2 className="font-bold" style={{ fontSize: '1.5rem', margin: 0 }}>Calculators</h2>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {calculators.map((calc, index) => (
                    <Link
                        key={index}
                        to={`/calculators/${calc.id}`}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            padding: '1.5rem',
                            backgroundColor: 'white',
                            borderRadius: 'var(--radius)',
                            boxShadow: 'var(--shadow)',
                            textDecoration: 'none',
                            color: 'var(--text-primary)'
                        }}
                    >
                        <div>
                            <div style={{ fontWeight: '600', marginBottom: '0.25rem' }}>{calc.name}</div>
                            <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{calc.description}</div>
                        </div>
                        <ChevronRight size={20} color="var(--text-secondary)" />
                    </Link>
                ))}
            </div>
        </div>
    );
}

export default Calculators;
