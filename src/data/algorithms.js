import clinicalPathDaily from '../content/paths/clinical-path-daily.md?raw';
import pacuPath from '../content/paths/pacu-path.md?raw';
import anesthesiaPath from '../content/paths/anesthesia-path.md?raw';

export const algorithms = [
  {
    id: 'hcv-positive-recipient',
    type: 'decision',
    title: 'HCV+ Positive Recipient',
    intro: 'For recipient patients with known HCV.',
    rootId: 'cirrhosis',
    nodes: {
      cirrhosis: {
        type: 'question',
        title: 'Cirrhosis',
        text: 'Select the cirrhosis status.',
        options: [
          {
            label: 'Decompensated with Portal Hypertension',
            nextId: 'sklt'
          },
          {
            label: 'Compensated without Portal Hypertension',
            nextId: 'donor-type'
          }
        ]
      },
      sklt: {
        type: 'result',
        title: 'Plan: SKLT',
        text: 'Simultaneous kidney-liver transplant (SKLT). HCV treatment timing: before transplant. Confirm timing with transplant hepatology per local policy.'
      },
      'donor-type': {
        type: 'question',
        title: 'Donor Type',
        text: 'Select the donor type for this recipient.',
        options: [
          {
            label: 'Living donor',
            nextId: 'living-timing'
          },
          {
            label: 'Deceased donor',
            nextId: 'deceased-access'
          }
        ]
      },
      'living-timing': {
        type: 'question',
        title: 'Expected Time to Transplant',
        text: 'Estimate time to transplant for living donor candidates.',
        options: [
          {
            label: 'Less than 24 weeks',
            nextId: 'living-after'
          },
          {
            label: '24 weeks or more',
            nextId: 'living-before-or-after'
          }
        ]
      },
      'living-after': {
        type: 'result',
        title: 'Treatment Timing',
        text: 'Treat HCV after transplant.'
      },
      'living-before-or-after': {
        type: 'result',
        title: 'Treatment Timing',
        text: 'Treat HCV before or after transplant based on genotype and available regimens.'
      },
      'deceased-access': {
        type: 'question',
        title: 'Rapid HCV+ Kidney Access',
        text: 'Is rapid access to an HCV+ deceased donor kidney possible?',
        options: [
          {
            label: 'Yes',
            nextId: 'deceased-after'
          },
          {
            label: 'No',
            nextId: 'deceased-before'
          }
        ]
      },
      'deceased-after': {
        type: 'result',
        title: 'Treatment Timing',
        text: 'Withold HCV treatment before transplant, accept kidney, give HCV treatment after transplantation if needed.'
      },
      'deceased-before': {
        type: 'result',
        title: 'Treatment Timing',
        text: 'Treat HCV before transplant.'
      }
    },
    roles: { include: ['pacu-nurse', 'clinician', 'inpatient-nurse', 'anesthesia', 'or-team'] },
  },
  {
    id: 'clinical-path-daily',
    type: 'path',
    title: 'Clinical Path - Daily',
    intro: 'Day-by-day clinical pathway for kidney transplant patients.',
    content: clinicalPathDaily
  },
  {
    id: 'pacu-path',
    type: 'path',
    title: 'PACU - path',
    intro: 'Immediate PACU protocol for kidney transplant recipients prior to ICU transfer.',
    roles: { include: ['pacu-nurse', 'clinician', 'inpatient-nurse', 'anesthesia', 'or-team'] },
    content: pacuPath
  },
  {
    id: 'anesthesia-path',
    type: 'path',
    title: 'Anesthesia',
    intro: 'Intraoperative anesthesia protocol for kidney transplant recipients.',
    roles: { include: ['clinician', 'or-team', 'pacu-nurse', 'anesthesia'] },
    content: anesthesiaPath
  }
];

export const getAlgorithmById = (id) => algorithms.find((algo) => algo.id === id);

export const isAlgorithmVisibleForRole = (algorithm, roleId) => {
  if (!algorithm.roles) {
    return true;
  }

  if (algorithm.roles.include) {
    return algorithm.roles.include.includes(roleId);
  }

  if (algorithm.roles.exclude) {
    return !algorithm.roles.exclude.includes(roleId);
  }

  return true;
};
