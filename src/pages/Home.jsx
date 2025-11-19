import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/KTXP-logo.svg';
import { Search } from 'lucide-react';

import audio1 from '../assets/audio/1.mp3';
import audio2 from '../assets/audio/2.mp3';
import audio3 from '../assets/audio/3.mp3';
import audio5 from '../assets/audio/5.mp3';
import audio6 from '../assets/audio/6.mp3';
import audio7 from '../assets/audio/7.mp3';
import audio8 from '../assets/audio/8.mp3';

function Home() {
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchTerm.trim()) {
            navigate(`/protocols?search=${encodeURIComponent(searchTerm)}`);
        }
    };

    const [salzImage, setSalzImage] = useState('/salz.png');
    // Audio files 1-3 trigger the frown image
    const frownAudioFiles = [audio1, audio2, audio3];
    const otherAudioFiles = [audio5, audio6, audio7, audio8];
    const audioFiles = [...frownAudioFiles, ...otherAudioFiles];

    const playRandomAudio = () => {
        const randomIndex = Math.floor(Math.random() * audioFiles.length);
        const selectedFile = audioFiles[randomIndex];
        const audio = new Audio(selectedFile);

        // Check if the selected file is one of the frown-inducing audios
        if (frownAudioFiles.includes(selectedFile)) {
            setSalzImage('/salz-frown.png');

            // Reset when audio ends
            audio.onended = () => {
                setSalzImage('/salz.png');
            };

            // Reset on error
            audio.onerror = (e) => {
                console.error("Audio error:", e);
                setSalzImage('/salz.png');
            };
        }

        // Play audio
        audio.play().catch(e => {
            console.error("Error playing audio:", e);
            // Revert image if play fails
            setSalzImage('/salz.png');
        });
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
                    <img
                        src={salzImage}
                        alt="Salz"
                        onClick={playRandomAudio}
                        style={{
                            position: 'absolute',
                            top: '5px',
                            right: '-40px',
                            width: '100px',
                            height: 'auto',
                            zIndex: 10,
                            cursor: 'pointer'
                        }}
                    />
                </div>
            </form>
        </div>
    );
}

export default Home;
