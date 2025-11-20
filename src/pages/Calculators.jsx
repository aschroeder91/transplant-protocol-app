import React from 'react';
import { Calculator, ChevronLeft, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';

function Calculators() {
    const calculators = [
        {
            name: 'Creatinine Clearance (Cockcroft-Gault)',
            url: 'https://www.mdcalc.com/calc/43/creatinine-clearance-cockcroft-gault-equation',
            description: 'Estimate renal function.'
        },
        {
            name: 'Fractional Excretion of Sodium (FENa)',
            url: 'https://www.mdcalc.com/calc/60/fractional-excretion-sodium-fena',
            description: 'Differentiate prerenal from intrinsic acute kidney injury.'
        }
    ];

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
                    <a
                        key={index}
                        href={calc.url}
                        target="_blank"
                        rel="noopener noreferrer"
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
                        <ExternalLink size={20} color="var(--text-secondary)" />
                    </a>
                ))}
            </div>
        </div>
    );
}

export default Calculators;
