import React from 'react';
import { roles } from '../data/roles';

function RoleSelector({ value, onChange, helper }) {
  return (
    <div className="role-card">
      <div className="role-card-header">
        <div>
          <div className="role-card-title">Your role</div>
          <div className="role-card-subtitle">Filter checklists and tools.</div>
        </div>
        {helper ? <div className="role-card-helper">{helper}</div> : null}
      </div>
      <select
        className="role-select"
        value={value}
        onChange={(event) => onChange(event.target.value)}
      >
        {roles.map((role) => (
          <option key={role.id} value={role.id}>
            {role.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export default RoleSelector;
