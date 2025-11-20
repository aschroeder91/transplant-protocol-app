import React from 'react';
import { Link } from 'react-router-dom';
import { Book, Calculator, Phone, CheckSquare, Activity, Pill, MessageSquare } from 'lucide-react';

function Tools() {
    const tools = [
        {
            id: 'directory',
            label: 'Directory',
            icon: <Phone size={32} />,
            path: '/directory',
            color: 'var(--primary-color)',
            isExternal: false
        },
        {
            id: 'calculators',
            label: 'Calculators',
            icon: <Calculator size={32} />,
            path: null, // Special handling for multiple links or a submenu? 
            // Plan said "Calculators (external links)". 
            // Let's make this a submenu or just list them here?
            // User said: "Calculators button from the Tools page"
            // So this should go to a Calculators page or expand.
            // Let's make it a route for now: /calculators
            path: '/calculators',
            color: '#10b981', // Emerald 500
            isExternal: false
        },
        {
            id: 'checklists',
            label: 'Checklists',
            icon: <CheckSquare size={32} />,
            path: '/checklists',
            color: '#f59e0b', // Amber 500
            isExternal: false
        },
        {
            id: 'algorithms',
            label: 'Algorithms',
            icon: <Activity size={32} />,
            path: '/algorithms',
            color: '#ef4444', // Red 500
            isExternal: false
        },
        {
            id: 'meds',
            label: 'Medication Ref',
            icon: <Pill size={32} />,
            path: '/medications',
            color: '#8b5cf6', // Violet 500
            isExternal: false
        },
        {
            id: 'feedback',
            label: 'Report Issues',
            icon: <MessageSquare size={32} />,
            path: '/feedback',
            color: '#6b7280', // Gray 500
            isExternal: false
        }
    ];

    return (
        <div className="container p-4">
            <h2 className="font-bold" style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }}>Tools</h2>

            <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '1rem'
            }}>
                {tools.map(tool => (
                    <Link
                        key={tool.id}
                        to={tool.path}
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            padding: '1.5rem',
                            backgroundColor: 'white',
                            borderRadius: 'var(--radius)',
                            boxShadow: 'var(--shadow)',
                            gap: '0.75rem',
                            textAlign: 'center',
                            color: 'var(--text-primary)',
                            textDecoration: 'none'
                        }}
                    >
                        <div style={{ color: tool.color }}>
                            {tool.icon}
                        </div>
                        <span style={{ fontWeight: '600', fontSize: '0.95rem' }}>{tool.label}</span>
                    </Link>
                ))}
            </div>
        </div>
    );
}

export default Tools;
