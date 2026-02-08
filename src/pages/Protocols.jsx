import React, { useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Activity, Book, BookOpenText, Calculator, CheckSquare, Pill, Search, ChevronRight, ExternalLink, Download } from 'lucide-react';
import { getResources } from '../data/resources';

function Protocols() {
    const [searchParams] = useSearchParams();
    const initialSearch = searchParams.get('search') || '';
    const [searchTerm, setSearchTerm] = useState(initialSearch);

    const iconByType = {
        resource: <BookOpenText size={16} />,
        checklist: <CheckSquare size={16} />,
        algorithm: <Activity size={16} />,
        'protocol-file': <Book size={16} />,
        medication: <Pill size={16} />,
        calculator: <Calculator size={16} />
    };

    const colorByType = {
        resource: 'var(--primary-color)',
        checklist: '#f59e0b',
        algorithm: '#ef4444',
        'protocol-file': '#0ea5e9',
        medication: '#8b5cf6',
        calculator: '#10b981'
    };

    const filteredResources = useMemo(() => {
        const resources = getResources();
        const term = searchTerm.trim().toLowerCase();

        const visibleResources = term
            ? resources.filter((resource) => {
                if (resource.title.toLowerCase().includes(term)) {
                    return true;
                }

                if (!Array.isArray(resource.searchTerms)) {
                    return false;
                }

                return resource.searchTerms.some((value) =>
                    String(value).toLowerCase().includes(term)
                );
            })
            : resources;

        return [...visibleResources].sort((a, b) =>
            a.title.localeCompare(b.title, undefined, { sensitivity: 'base' })
        );
    }, [searchTerm]);

    return (
        <div className="container p-4">
            <h2 className="font-bold" style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Resources</h2>

            <div className="filter-bar">
                <Search size={18} />
                <input
                    type="text"
                    placeholder="Filter resources..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {filteredResources.map((resource) => {
                    const cardStyles = {
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '1rem',
                        backgroundColor: 'white',
                        borderRadius: 'var(--radius)',
                        boxShadow: 'var(--shadow)',
                        color: 'var(--text-primary)'
                    };

                    const content = (
                        <>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                <div style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: colorByType[resource.type] || 'var(--text-secondary)'
                                }}>
                                    {iconByType[resource.type]}
                                </div>
                                <div style={{ fontWeight: '600' }}>{resource.title}</div>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                                {resource.isExternal && <ExternalLink size={16} color="var(--text-secondary)" />}
                                {resource.canDownload && <Download size={16} color="var(--text-secondary)" />}
                                {!resource.isExternal && !resource.canDownload && (
                                    <ChevronRight size={18} color="var(--text-secondary)" />
                                )}
                            </div>
                        </>
                    );

                    if (resource.isExternal || resource.canDownload) {
                        return (
                            <a
                                key={resource.id}
                                href={resource.href}
                                target={resource.isExternal ? '_blank' : undefined}
                                rel={resource.isExternal ? 'noopener noreferrer' : undefined}
                                download={resource.canDownload || undefined}
                                style={cardStyles}
                            >
                                {content}
                            </a>
                        );
                    }

                    return (
                        <Link key={resource.id} to={resource.href} style={cardStyles}>
                            {content}
                        </Link>
                    );
                })}
                {filteredResources.length === 0 && (
                    <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-secondary)' }}>
                        No resources found.
                    </div>
                )}
            </div>
        </div>
    );
}

export default Protocols;
