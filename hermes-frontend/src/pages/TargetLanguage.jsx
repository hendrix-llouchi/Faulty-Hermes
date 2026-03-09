import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './TargetLanguage.css';
import { useEffect } from 'react'

// SVG assets mapped directly to the names from Figma output
import imgMore from '../assets/flag_530c05e2ac27333f980a2f77bbecd28da11275a6.svg';
import imgCheckmark from '../assets/flag_83b557b568697c7caab04777c83d9e711bbae812.svg';

// Spanish
import imgEsBg from '../assets/flag_cdfd84e4c7497fda2e599c3f93a95194dd12bee4.svg';
import imgEsStripe from '../assets/flag_014b951ae9cd851b0b04334d41541d4f5c3e50be.svg';

// French, Japanese, Italian (all share a circular base)
import imgCirBg from '../assets/flag_9c4db0d6e8e6aff018d7a8e89471f147cb7d4b30.svg';

// French
import imgFrLeft from '../assets/flag_5c3b61bc6a9811cd2dd16f9218c14c122b1d2642.svg';
import imgFrRight from '../assets/flag_5a4897cd3089dabbdae76904e9844aed3e74c9b3.svg';

// German
import imgDeBg from '../assets/flag_e648c9f0eeab7466004ef9db371fae6841cd538b.svg';
import imgDeTop from '../assets/flag_df4177321c662dfe0f3c545c72e3846f346a51ae.svg';
import imgDeMid from '../assets/flag_5bc4305c82e69e89bb735ac9f01208759c109ce0.svg';

// Japanese
import imgJpCircle from '../assets/flag_a45cdeb0639051dd62912b7b951ecaa59ae04d86.svg';

// Italian
import imgItLeft from '../assets/flag_e6cc1bad278221cde9105e68bed0193eaac1fc6b.svg';
import imgItRight from '../assets/flag_82498640b2c026652c1026dad02d917c14da2db9.svg';

// Korean pieces
import imgKr from '../assets/korean-flag.png';
import imgEn from '../assets/english-flag.png';

const languages = [
    {
        id: 'en', name: 'English', native: 'English',
        flagRender: () => (
            <>
                <img src={imgEn} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </>
        )
    },
    {
        id: 'es', name: 'Spanish', native: 'Español',
        flagRender: () => (
            <>
                <img src={imgEsBg} alt="" className="flag-layer" />
                <img src={imgEsStripe} alt="" className="flag-layer" style={{ height: '50%', top: '25%' }} />
            </>
        )
    },
    {
        id: 'fr', name: 'French', native: 'Français',
        flagRender: () => (
            <>
                <img src={imgCirBg} alt="" className="flag-layer" />
                <img src={imgFrLeft} alt="" className="flag-layer" style={{ width: '33.2%', left: '0' }} />
                <img src={imgFrRight} alt="" className="flag-layer" style={{ width: '33.2%', right: '0' }} />
            </>
        )
    },
    {
        id: 'de', name: 'German', native: 'Deutsch',
        flagRender: () => (
            <>
                <img src={imgDeBg} alt="" className="flag-layer" />
                <img src={imgDeTop} alt="" className="flag-layer" style={{ height: '33.2%', top: '0' }} />
                <img src={imgDeMid} alt="" className="flag-layer" style={{ height: '33.2%', top: '33.2%' }} />
            </>
        )
    },
    {
        id: 'jp', name: 'Japanese', native: '日本語',
        flagRender: () => (
            <>
                <img src={imgCirBg} alt="" className="flag-layer" />
                <img src={imgJpCircle} alt="" className="flag-layer" style={{ width: '58.6%', height: '58.6%', top: '20.7%', left: '20.7%' }} />
            </>
        )
    },
    {
        id: 'it', name: 'Italian', native: 'Italiano',
        flagRender: () => (
            <>
                <img src={imgCirBg} alt="" className="flag-layer" />
                <img src={imgItLeft} alt="" className="flag-layer" style={{ width: '33.2%', left: '0' }} />
                <img src={imgItRight} alt="" className="flag-layer" style={{ width: '33.2%', right: '0' }} />
            </>
        )
    },
    {
        id: 'kr', name: 'Korean', native: '한국어',
        flagRender: () => (
            <>
                <img src={imgKr} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </>
        )
    }
];

export default function TargetLanguage() {
    useEffect(() => {
        document.title = 'FaultyHermes - Target Language';
    }, []);

    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api/v1';
    const navigate = useNavigate();
    const [fluentLang, setFluentLang] = useState(null);
    const [focusLang, setFocusLang] = useState(null);
    const [isSaving, setIsSaving] = useState(false);
    const [error, setError] = useState('');

    const handleContinue = async () => {
        if (!fluentLang || !focusLang) return;
        setIsSaving(true);
        setError('');

        const username = localStorage.getItem('hermes_username');
        if (username) {
            try {
                await fetch(`${API_BASE_URL}/users/profile/`, {
                    method: 'PATCH',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ username, target_lang: focusLang }),
                });
                // Store so other parts of the app know the user's language
                localStorage.setItem('hermes_target_lang', focusLang);
            } catch (e) {
                console.error('Could not save target language:', e);
                // Non-blocking — continue anyway
            }
        }
        setIsSaving(false);
        navigate('/dashboard');
    };

    const renderLanguageGrid = (selectedLang, setSelectedLang) => {
        return (
            <div className="language-grid">
                {languages.map(lang => {
                    const isSelected = selectedLang === lang.id;
                    return (
                        <div
                            key={lang.id}
                            className={`language-card ${isSelected ? 'selected' : ''}`}
                            onClick={() => setSelectedLang(lang.id)}
                        >
                            <div className="flag-container">
                                {lang.flagRender()}
                            </div>
                            <div className="language-info">
                                <span className="language-name">{lang.name}</span>
                                <span className="language-native">{lang.native}</span>
                            </div>
                            {isSelected && (
                                <div className="checkmark-badge">
                                    <img src={imgCheckmark} alt="Selected" />
                                </div>
                            )}
                        </div>
                    );
                })}
                <div className="more-languages-card">
                    <div className="more-icon-wrapper">
                        <img src={imgMore} alt="More" className="more-icon" />
                    </div>
                    <span>More Languages</span>
                </div>
            </div>
        );
    };

    return (
        <div className="target-lang-container">
            <div className="target-lang-main">
                {/* Fluent In Section */}
                <div className="target-section">
                    <div className="target-header">
                        <h1 className="target-title">Choose your target language</h1>
                        <p className="target-subtitle">Select the language you are familiar and fluent in</p>
                    </div>
                    {renderLanguageGrid(fluentLang, setFluentLang)}
                </div>

                {/* Focus On Section */}
                <div className="target-section" style={{ marginTop: '20px' }}>
                    <div className="target-header">
                        <h1 className="target-title">Choose your target language</h1>
                        <p className="target-subtitle">Select the language you want to focus on first. You can always add more languages to your bento later.</p>
                    </div>
                    {renderLanguageGrid(focusLang, setFocusLang)}
                </div>

                {/* Continue Action */}
                {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
                <div className="target-actions">
                    <button
                        className="btn-continue"
                        onClick={handleContinue}
                        disabled={!fluentLang || !focusLang || isSaving}
                    >
                        {isSaving ? 'Saving...' : 'Continue'}
                    </button>
                </div>
            </div>
        </div>
    );
}
