import protocolsData from './protocols.json';
import { checklists } from './checklists';
import { algorithms } from './algorithms';
import { protocolFiles, getProtocolFileUrl } from './protocolFiles';
import { calculators } from './calculators';
import { medicationReferences } from './medications';

export const getResources = () => {
  const protocolResources = protocolsData.map((item) => ({
    id: `resource-${item.id}`,
    title: item.title,
    type: 'resource',
    href: `/resources/${item.id}`,
    isExternal: false,
    canDownload: false,
    searchTerms: [item.title, item.category, ...(item.keywords || [])]
  }));

  const checklistResources = checklists.map((item) => ({
    id: `checklist-${item.id}`,
    title: item.title,
    type: 'checklist',
    href: `/checklists/${item.id}`,
    isExternal: false,
    canDownload: false,
    searchTerms: [item.title, item.summary || '']
  }));

  const algorithmResources = algorithms.map((item) => ({
    id: `algorithm-${item.id}`,
    title: item.title,
    type: 'algorithm',
    href: `/algorithms/${item.id}`,
    isExternal: false,
    canDownload: false,
    searchTerms: [item.title, item.intro || '']
  }));

  const protocolFileResources = protocolFiles.map((item) => ({
    id: `protocol-file-${item.id}`,
    title: item.title,
    type: 'protocol-file',
    href: getProtocolFileUrl(item.fileName),
    isExternal: false,
    canDownload: true,
    searchTerms: [item.title, item.fileName]
  }));

  const calculatorResources = calculators.map((item) => ({
    id: `calculator-${item.id}`,
    title: item.name,
    type: 'calculator',
    href: `/calculators/${item.id}`,
    isExternal: false,
    canDownload: false,
    searchTerms: [item.name, item.description || '']
  }));

  const medicationResourcesList = medicationReferences.map((item) => ({
    id: `medication-${item.id}`,
    title: item.title,
    type: 'medication',
    href: item.url || `/medications/${item.id}`,
    isExternal: Boolean(item.url),
    canDownload: false,
    searchTerms: [item.title, item.summary || '']
  }));

  return [
    ...protocolResources,
    ...checklistResources,
    ...algorithmResources,
    ...protocolFileResources,
    ...calculatorResources,
    ...medicationResourcesList
  ];
};
