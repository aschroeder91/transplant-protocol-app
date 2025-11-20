import React from 'react';
import { Phone, ChevronLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import directoryData from '../data/directory.json';

function Directory() {
    return (
        <div className="container p-4">
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1.5rem', gap: '0.5rem' }}>
                <Link to="/tools" style={{ color: 'var(--text-primary)' }}>
                    <ChevronLeft size={24} />
                </Link>
                <h2 className="font-bold" style={{ fontSize: '1.5rem', margin: 0 }}>Directory</h2>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                {directoryData.map((section, index) => (
                    <div key={index}>
                        <h3 style={{
                            fontSize: '1.1rem',
                            fontWeight: '600',
                            color: 'var(--primary-color)',
                            marginBottom: '0.75rem',
                            borderBottom: '2px solid var(--border-color)',
                            paddingBottom: '0.25rem'
                        }}>
                            {section.category}
                        </h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                            {section.contacts.map((contact, cIndex) => (
                                <div key={cIndex} style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    padding: '1rem',
                                    backgroundColor: 'white',
                                    borderRadius: 'var(--radius)',
                                    boxShadow: '0 1px 2px rgba(0,0,0,0.05)'
                                }}>
                                    <div>
                                        <div style={{ fontWeight: '600' }}>{contact.name}</div>
                                        <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{contact.role}</div>
                                    </div>
                                    <a href={`tel:${contact.phone.replace(/-/g, '')}`} style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        width: '40px',
                                        height: '40px',
                                        borderRadius: '50%',
                                        backgroundColor: '#ecfdf5', // Light green bg
                                        color: '#059669', // Green text
                                        textDecoration: 'none'
                                    }}>
                                        <Phone size={20} />
                                    </a>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Directory;
