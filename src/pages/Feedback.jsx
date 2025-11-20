import React from 'react';
import { ChevronLeft, MessageSquare } from 'lucide-react';
import { Link } from 'react-router-dom';

function Feedback() {
    return (
        <div className="container p-4">
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1.5rem', gap: '0.5rem' }}>
                <Link to="/tools" style={{ color: 'var(--text-primary)' }}>
                    <ChevronLeft size={24} />
                </Link>
                <h2 className="font-bold" style={{ fontSize: '1.5rem', margin: 0 }}>Report Issues</h2>
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
                <MessageSquare size={48} style={{ marginBottom: '1rem', opacity: 0.5 }} />
                <h3 style={{ fontSize: '1.2rem', fontWeight: '600', marginBottom: '0.5rem' }}>Feedback</h3>
                <p>Please report any outdated protocols or bugs to the transplant administrator.</p>
                <a href="mailto:awschroeder@carilionclinic.org" style={{
                    marginTop: '1rem',
                    color: 'var(--primary-color)',
                    fontWeight: '600'
                }}>
                    Email Admin
                </a>
            </div>
        </div>
    );
}

export default Feedback;
