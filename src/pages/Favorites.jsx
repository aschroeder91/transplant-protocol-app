import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import protocolsData from '../data/protocols.json';
import { getFavorites } from '../utils/storage';
import { ChevronRight, Star } from 'lucide-react';

function Favorites() {
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        const favIds = getFavorites();
        const favProtocols = protocolsData.filter(p => favIds.includes(p.id));
        setFavorites(favProtocols);
    }, []);

    return (
        <div className="container p-4">
            <h2 className="font-bold" style={{ fontSize: '1.5rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Star fill="#eab308" color="#eab308" size={24} />
                Favorites
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {favorites.map(protocol => (
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
                {favorites.length === 0 && (
                    <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-secondary)' }}>
                        No favorites yet. Star a protocol to see it here.
                    </div>
                )}
            </div>
        </div>
    );
}

export default Favorites;
