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

    // Define audio groups
    const frownAudioFiles = [audio1, audio2, audio3];
    const otherAudioFiles = [audio5, audio6, audio7, audio8];
    const allAudioFiles = [...frownAudioFiles, ...otherAudioFiles];

    // Shuffle helper
    const shuffleArray = (array) => {
        const newArray = [...array];
        for (let i = newArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
        }
        return newArray;
    };

    // State for playlist
    const [playlist, setPlaylist] = useState(() => shuffleArray(allAudioFiles));
    const [currentTrackIndex, setCurrentTrackIndex] = useState(0);

    const playNextAudio = () => {
        if (allAudioFiles.length === 0) return;

        // If playlist is empty, reshuffle
        if (playlist.length === 0) {
            const newPlaylist = shuffleArray([...allAudioFiles]);
            setPlaylist(newPlaylist);
            setCurrentTrackIndex(0);
            playAudio(newPlaylist[0]);
        } else {
            // Play next in current playlist
            const nextTrack = playlist[currentTrackIndex];
            playAudio(nextTrack);

            // Prepare for next click
            if (currentTrackIndex < playlist.length - 1) {
                setCurrentTrackIndex(prev => prev + 1);
            } else {
                // End of playlist, clear it so next click reshuffles
                setPlaylist([]);
            }
        }
    };

    const playAudio = (audioFile) => {
        const audio = new Audio(audioFile);

        // Set image based on track
        if (frownAudioFiles.includes(audioFile)) {
            setSalzImage('/salz-frown.png');
        } else {
            setSalzImage('/salz-happy.png');
        }

        audio.onended = () => {
            setSalzImage('/salz.png');
        };

        audio.onerror = (e) => {
            console.error("Audio playback error:", e);
            setSalzImage('/salz.png');
        };

        audio.play().catch(e => {
            console.error("Play failed:", e);
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
                        onClick={playNextAudio}
                        style={{
                            position: 'absolute',
                            top: '-10px',
                            right: '-40px',
                            width: '140px',
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
