import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Book, Calculator, Phone, CheckSquare, Activity, Pill, MessageSquare } from 'lucide-react';
import RoleSelector from '../components/RoleSelector';
import { DEFAULT_ROLE_ID } from '../data/roles';
import { getRole, setRole } from '../utils/storage';

function Tools() {
    const [roleId, setRoleId] = useState(() => getRole(DEFAULT_ROLE_ID));

    useEffect(() => {
        setRole(roleId);
    }, [roleId]);

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
            // Calculators (external links) live on the Calculators page.
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
            id: 'protocol-files',
            label: 'Protocol Files',
            icon: <Book size={32} />,
            path: '/protocol-files',
            color: '#0ea5e9', // Sky 500
            isExternal: false
        },
        {
            id: 'algorithms',
            label: 'Algorithms / Paths',
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

    const documentationTools = [
        {
            id: 'cpt-codes',
            label: 'CPT Codes',
            icon: <Book size={32} />,
            path: '/documentation/cpt-codes',
            color: '#38bdf8'
        }
    ];

    return (
        <div className="container p-4">
            <h2 className="font-bold" style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }}>Tools</h2>

            <RoleSelector value={roleId} onChange={setRoleId} />

            <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '1rem',
                marginTop: '1.5rem'
            }}>
                {[...tools, ...documentationTools].map(tool => (
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
