import protocolsData from './protocols.json';
import { checklists } from './checklists';
import { algorithms } from './algorithms';
import { calculators } from './calculators';
import { medicationReferences } from './medications';

export const trackableEntries = [
  ...protocolsData.map((item) => ({
    key: `resource:${item.id}`,
    type: 'resource',
    id: item.id,
    title: item.title,
    subtitle: `Resource • ${item.category}`,
    path: `/resources/${item.id}`
  })),
  ...checklists.map((item) => ({
    key: `checklist:${item.id}`,
    type: 'checklist',
    id: item.id,
    title: item.title,
    subtitle: 'Checklist',
    path: `/checklists/${item.id}`
  })),
  ...algorithms.map((item) => ({
    key: `algorithm:${item.id}`,
    type: 'algorithm',
    id: item.id,
    title: item.title,
    subtitle: item.type === 'path' ? 'Pathway' : 'Algorithm',
    path: `/algorithms/${item.id}`
  })),
  ...calculators.map((item) => ({
    key: `calculator:${item.id}`,
    type: 'calculator',
    id: item.id,
    title: item.name,
    subtitle: 'Calculator',
    path: `/calculators/${item.id}`
  })),
  ...medicationReferences.map((item) => ({
    key: `medication:${item.id}`,
    type: 'medication',
    id: item.id,
    title: item.title,
    subtitle: 'Medication Ref',
    path: `/medications/${item.id}`
  }))
];

const byKey = new Map(trackableEntries.map((entry) => [entry.key, entry]));

export const getTrackableEntryByKey = (key) => byKey.get(key) || null;

const getPathId = (pathname, prefix) => {
  if (!pathname.startsWith(prefix)) {
    return null;
  }

  const id = pathname.slice(prefix.length).split('/')[0];
  return id || null;
};

export const getTrackableEntryByPath = (pathname) => {
  const resourceId = getPathId(pathname, '/resources/');
  if (resourceId) {
    return getTrackableEntryByKey(`resource:${resourceId}`);
  }

  const legacyResourceId = getPathId(pathname, '/protocol/');
  if (legacyResourceId) {
    return getTrackableEntryByKey(`resource:${legacyResourceId}`);
  }

  const checklistId = getPathId(pathname, '/checklists/');
  if (checklistId) {
    return getTrackableEntryByKey(`checklist:${checklistId}`);
  }

  const algorithmId = getPathId(pathname, '/algorithms/');
  if (algorithmId) {
    return getTrackableEntryByKey(`algorithm:${algorithmId}`);
  }

  const calculatorId = getPathId(pathname, '/calculators/');
  if (calculatorId) {
    return getTrackableEntryByKey(`calculator:${calculatorId}`);
  }

  const medicationId = getPathId(pathname, '/medications/');
  if (medicationId) {
    return getTrackableEntryByKey(`medication:${medicationId}`);
  }

  return null;
};
