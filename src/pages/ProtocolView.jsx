import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import protocolsData from '../data/protocols.json';
import { Star, ArrowLeft, AlertTriangle } from 'lucide-react';
import { isFavorite, toggleFavorite, addToRecents } from '../utils/storage';

function ProtocolView() {
    const { id } = useParams();
    const navigate = useNavigate();
    const protocol = protocolsData.find(p => p.id === id);

    const [activeTab, setActiveTab] = useState('simple'); // 'simple' or 'detailed'
    const [favorited, setFavorited] = useState(false);

    useEffect(() => {
        if (protocol) {
            addToRecents(protocol.id);
            setFavorited(isFavorite(protocol.id));
        }
    }, [protocol]);

    if (!protocol) {
        return <div className="p-4">Protocol not found.</div>;
    }

    const handleToggleFavorite = () => {
        toggleFavorite(protocol.id);
        setFavorited(!favorited);
    };

    return (
        <div className="container" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            {/* Header */}
            <div style={{
                padding: '1rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                borderBottom: '1px solid var(--border-color)',
                backgroundColor: 'white',
                position: 'sticky',
                top: 0,
                zIndex: 10
            }}>
                <button onClick={() => navigate(-1)} style={{ display: 'flex', alignItems: 'center', color: 'var(--text-secondary)' }}>
                    <ArrowLeft size={24} />
                </button>
                <h1 style={{ fontSize: '1.1rem', fontWeight: '600', flex: 1, textAlign: 'center', margin: '0 1rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {protocol.title}
                </h1>
                <button onClick={handleToggleFavorite}>
                    <Star size={24} fill={favorited ? "#eab308" : "none"} color={favorited ? "#eab308" : "var(--text-secondary)"} />
                </button>
            </div>

            {/* Urgent Banner */}
            {protocol.isUrgent && (
                <div style={{
                    backgroundColor: '#fef2f2',
                    color: 'var(--urgent-color)',
                    padding: '0.75rem 1rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    fontSize: '0.9rem',
                    fontWeight: '600',
                    borderBottom: '1px solid #fee2e2'
                }}>
                    <AlertTriangle size={18} />
                    <span>URGENT PROTOCOL</span>
                </div>
            )}

            {/* Content Area */}
            <div style={{ flex: 1, overflowY: 'auto', padding: '1rem' }}>
                <div
                    className="protocol-content"
                    dangerouslySetInnerHTML={{ __html: activeTab === 'simple' ? protocol.overview : protocol.detailed }}
                    style={{ lineHeight: '1.6' }}
                />
            </div>

            {/* Bottom Tabs */}
            <div style={{
                display: 'flex',
                borderTop: '1px solid var(--border-color)',
                backgroundColor: 'white'
            }}>
                <button
                    onClick={() => setActiveTab('simple')}
                    style={{
                        flex: 1,
                        padding: '1rem',
                        textAlign: 'center',
                        fontWeight: '600',
                        color: activeTab === 'simple' ? 'var(--primary-color)' : 'var(--text-secondary)',
                        borderBottom: activeTab === 'simple' ? '2px solid var(--primary-color)' : 'none'
                    }}
                >
                    Simple
                </button>
                <button
                    onClick={() => setActiveTab('detailed')}
                    style={{
                        flex: 1,
                        padding: '1rem',
                        textAlign: 'center',
                        fontWeight: '600',
                        color: activeTab === 'detailed' ? 'var(--primary-color)' : 'var(--text-secondary)',
                        borderBottom: activeTab === 'detailed' ? '2px solid var(--primary-color)' : 'none'
                    }}
                >
                    Detailed
                </button>
            </div>
        </div>
    );
}

export default ProtocolView;
