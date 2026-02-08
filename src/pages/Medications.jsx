import React from 'react';
import { ChevronLeft, ChevronRight, Pill } from 'lucide-react';
import { Link } from 'react-router-dom';
import { medicationReferences } from '../data/medications';

function Medications() {
    return (
        <div className="container p-4">
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1.5rem', gap: '0.5rem' }}>
                <Link to="/tools" style={{ color: 'var(--text-primary)' }}>
                    <ChevronLeft size={24} />
                </Link>
                <h2 className="font-bold" style={{ fontSize: '1.5rem', margin: 0 }}>Medication Reference</h2>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {medicationReferences.map((item) => (
                    <Link
                        key={item.id}
                        to={`/medications/${item.id}`}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            padding: '1rem',
                            backgroundColor: 'white',
                            borderRadius: 'var(--radius)',
                            boxShadow: 'var(--shadow)',
                            textDecoration: 'none',
                            color: 'var(--text-primary)'
                        }}
                    >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                            <div style={{
                                backgroundColor: '#ede9fe',
                                color: '#7c3aed',
                                borderRadius: '0.75rem',
                                padding: '0.5rem',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                <Pill size={20} />
                            </div>
                            <div>
                                <div style={{ fontWeight: '600' }}>{item.title}</div>
                                <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                                    {item.summary}
                                </div>
                            </div>
                        </div>
                        <ChevronRight size={18} color="var(--text-secondary)" />
                    </Link>
                ))}
                {medicationReferences.length === 0 && (
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
                        <Pill size={48} style={{ marginBottom: '1rem', opacity: 0.5 }} />
                        <h3 style={{ fontSize: '1.2rem', fontWeight: '600', marginBottom: '0.5rem' }}>Coming Soon</h3>
                        <p>Quick reference cards for common transplant medications are under development.</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Medications;
