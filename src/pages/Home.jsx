import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/KTXP-logo.svg';
import { Search } from 'lucide-react';

function Home() {
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchTerm.trim()) {
            navigate(`/protocols?search=${encodeURIComponent(searchTerm)}`);
        }
    };

    return (
        <div className="container" style={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', paddingBottom: '100px' }}>
            <div style={{ marginBottom: '3rem', textAlign: 'center', width: '100%' }}>
                <img src={logo} alt="Kidney Transplant Protocols" style={{ width: '80%', maxWidth: '500px', height: 'auto' }} />
                <h1 style={{ marginTop: '1rem', fontSize: '1.1rem', fontWeight: '600', color: 'var(--primary-color)' }}>Transplant Protocols</h1>
            </div>

            <form onSubmit={handleSearch} style={{ width: '100%', maxWidth: '400px', position: 'relative' }}>
                <div style={{ position: 'relative' }}>
                    <Search size={20} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
                    <input
                        type="text"
                        placeholder="Search protocols..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        style={{
                            width: '100%',
                            padding: '12px 12px 12px 40px',
                            borderRadius: '24px',
                            border: '1px solid var(--border-color)',
                            fontSize: '1rem',
                            boxShadow: 'var(--shadow)',
                            outline: 'none'
                        }}
                    />
                </div>
            </form>

            <img
                src="/salz.png"
                alt="Salz"
                style={{
                    position: 'absolute',
                    bottom: '1rem',
                    right: '1rem',
                    width: '50px',
                    height: 'auto',
                    opacity: 0.8
                }}
            />
        </div>
    );
}

export default Home;
