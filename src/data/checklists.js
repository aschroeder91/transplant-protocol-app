import preOpChecklist from '../content/checklists/pre-op-transplant-checklist.md?raw';
import roundingChecklist from '../content/checklists/provider-rounding-checklist.md?raw';
import orSetupChecklist from '../content/checklists/or-setup-checklist.md?raw';

export const checklists = [
  {
    id: 'pre-op-transplant',
    title: 'Pre-Op Checklist',
    summary: 'Pre-op verification, labs, and medication prep.',
    roles: { exclude: ['social-work'] },
    content: preOpChecklist
  },
  {
    id: 'provider-rounding',
    title: 'Rounding Checklist',
    summary: 'Daily multidisciplinary rounding checklist.',
    roles: { include: ['clinician', 'inpatient-nurse'] },
    content: roundingChecklist
  },
  {
    id: 'or-setup',
    title: 'OR Setup Checklist',
    summary: 'Room setup, time-outs, and intraoperative documentation.',
    roles: { include: ['or-team', 'clinician', 'anesthesia'] },
    content: orSetupChecklist
  }
];

export const isChecklistVisibleForRole = (checklist, roleId) => {
  if (!checklist.roles) {
    return true;
  }

  if (checklist.roles.include) {
    return checklist.roles.include.includes(roleId);
  }

  if (checklist.roles.exclude) {
    return !checklist.roles.exclude.includes(roleId);
  }

  return true;
};

export const getChecklistById = (checklistId) =>
  checklists.find((item) => item.id === checklistId);
