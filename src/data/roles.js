export const roles = [
  { id: 'clinician', label: 'Clinician' },
  { id: 'pre-op-nurse', label: 'Pre-op Nurse' },
  { id: 'inpatient-nurse', label: 'Inpatient Nurse' },
  { id: 'outpatient-nurse', label: 'Outpatient Nurse' },
  { id: 'pacu-nurse', label: 'PACU Nurse' },
  { id: 'or-team', label: 'OR Team' },
  { id: 'anesthesia', label: 'Anesthesia' },
  { id: 'social-work', label: 'Social Work' }
];

export const DEFAULT_ROLE_ID = 'clinician';

export const getRoleLabel = (roleId) => {
  const role = roles.find((item) => item.id === roleId);
  return role ? role.label : 'Clinician';
};
