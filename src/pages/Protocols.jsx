import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import protocolsData from '../data/protocols.json';
import { AlertTriangle, FileText, ChevronRight } from 'lucide-react';

function Protocols() {
    const [searchParams] = useSearchParams();
    const initialSearch = searchParams.get('search') || '';
    const [filter, setFilter] = useState('all'); // 'all', 'urgent'
    const [searchTerm, setSearchTerm] = useState(initialSearch);

    const filteredProtocols = protocolsData.filter(p => {
        const searchLower = searchTerm.toLowerCase();
        const matchesSearch = p.title.toLowerCase().includes(searchLower) ||
            p.category.toLowerCase().includes(searchLower) ||
            (p.keywords && p.keywords.some(k => k.toLowerCase().includes(searchLower)));
        const matchesFilter = filter === 'urgent' ? p.isUrgent : true;
        return matchesSearch && matchesFilter;
    });

    // Group by category for the "All" view if not searching? 
    // The design says: "All" tile takes you to a list of all... in alphabetical order.
    // "Urgent" takes you to a filtered list.
    // And "tiles below that are categories".

    // Let's implement the top tiles and then the list.

    const sortedProtocols = [...filteredProtocols].sort((a, b) => a.fileName.localeCompare(b.fileName));

    // Get unique categories
    const categories = [...new Set(protocolsData.map(p => p.category))];

    return (
        <div className="container p-4">
            <h2 className="font-bold" style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Protocols</h2>

            {/* Search Bar if needed here too, or just rely on Home? Design didn't specify search on this page but it's good UX. */}
            <input
                type="text"
                placeholder="Filter protocols..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                    width: '100%',
                    padding: '10px',
                    borderRadius: '8px',
                    border: '1px solid var(--border-color)',
                    marginBottom: '1rem'
                }}
            />

            {/* Top Tiles */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
                <button
                    onClick={() => setFilter('all')}
                    style={{
                        padding: '1.5rem',
                        backgroundColor: filter === 'all' ? 'var(--primary-color)' : 'white',
                        color: filter === 'all' ? 'white' : 'var(--text-primary)',
                        borderRadius: 'var(--radius)',
                        boxShadow: 'var(--shadow)',
                        textAlign: 'center',
                        fontWeight: 'bold'
                    }}
                >
                    All
                </button>
                <button
                    onClick={() => setFilter('urgent')}
                    style={{
                        padding: '1.5rem',
                        backgroundColor: filter === 'urgent' ? 'var(--urgent-color)' : 'white',
                        color: filter === 'urgent' ? 'white' : 'var(--urgent-color)',
                        borderRadius: 'var(--radius)',
                        boxShadow: 'var(--shadow)',
                        textAlign: 'center',
                        fontWeight: 'bold',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '0.5rem'
                    }}
                >
                    <AlertTriangle size={24} />
                    Urgent
                </button>
            </div>

            {/* Categories Tiles (only show if no search and showing All) */}
            {!searchTerm && filter === 'all' && (
                <div style={{ marginBottom: '1.5rem' }}>
                    <h3 style={{ fontSize: '1rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>Categories</h3>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: '0.75rem' }}>
                        {categories.map(cat => (
                            <div key={cat} style={{
                                padding: '1rem',
                                backgroundColor: 'white',
                                borderRadius: 'var(--radius)',
                                border: '1px solid var(--border-color)',
                                fontSize: '0.9rem',
                                fontWeight: '500'
                            }}>
                                {cat}
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {sortedProtocols.map(protocol => (
                    <Link to={`/protocol/${protocol.id}`} key={protocol.id} style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '1rem',
                        backgroundColor: 'white',
                        borderRadius: 'var(--radius)',
                        boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
                        borderLeft: protocol.isUrgent ? '4px solid var(--urgent-color)' : '4px solid transparent'
                    }}>
                        <div>
                            <div style={{ fontWeight: '600' }}>{protocol.title}</div>
                            <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{protocol.category}</div>
                        </div>
                        <ChevronRight size={20} color="var(--text-secondary)" />
                    </Link>
                ))}
                {sortedProtocols.length === 0 && (
                    <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-secondary)' }}>
                        No protocols found.
                    </div>
                )}
            </div>
        </div>
    );
}

export default Protocols;
