import React, { useEffect, useMemo, useState } from 'react';
import { ChevronLeft, CheckSquare } from 'lucide-react';
import { Link } from 'react-router-dom';
import RoleSelector from '../components/RoleSelector';
import { checklists, isChecklistVisibleForRole } from '../data/checklists';
import { DEFAULT_ROLE_ID, getRoleLabel } from '../data/roles';
import { getRole, setRole } from '../utils/storage';

function Checklists() {
    const [roleId, setRoleId] = useState(() => getRole(DEFAULT_ROLE_ID));

    useEffect(() => {
        setRole(roleId);
    }, [roleId]);

    const visibleChecklists = useMemo(
        () => checklists.filter((item) => isChecklistVisibleForRole(item, roleId)),
        [roleId]
    );

    return (
        <div className="container p-4">
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1.5rem', gap: '0.5rem' }}>
                <Link to="/tools" style={{ color: 'var(--text-primary)' }}>
                    <ChevronLeft size={24} />
                </Link>
                <h2 className="font-bold" style={{ fontSize: '1.5rem', margin: 0 }}>Checklists</h2>
            </div>

            <RoleSelector value={roleId} onChange={setRoleId} />

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1.5rem' }}>
                {visibleChecklists.map((item) => (
                    <Link
                        key={item.id}
                        to={`/checklists/${item.id}`}
                        className="checklist-card"
                    >
                        <div className="checklist-card-icon">
                            <CheckSquare size={22} />
                        </div>
                        <div>
                            <div className="checklist-card-title">{item.title}</div>
                            <div className="checklist-card-summary">{item.summary}</div>
                        </div>
                    </Link>
                ))}
                {visibleChecklists.length === 0 && (
                    <div className="empty-state">
                        No checklists are assigned to {getRoleLabel(roleId)}. Try a different role.
                    </div>
                )}
            </div>
        </div>
    );
}

export default Checklists;
