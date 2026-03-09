import React, { useState } from 'react';
import './Dashboard.css';
import FaultyHermesLogo from '/FaultyHermesLogo.png'
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

// Local Assets
import imgLogo from '../assets/dash-logo.svg';
import imgDiamond from '../assets/dash-diamond.svg';
import imgBell from '../assets/dash-bell.svg';
import imgSearch from '../assets/dash-search.svg';
import imgAddPartner from '../assets/dash-add-partner.svg';
import imgTrophyWhite from '../assets/dash-trophy-white.svg';
import imgArrowUp from '../assets/dash-arrow-up.svg';
import imgFire from '../assets/dash-fire.svg';
import imgCheckSmall from '../assets/dash-check-small.svg';
import imgTrophyDark from '../assets/dash-trophy-dark.svg';
import imgQuest from '../assets/dash-quest.svg';

import avatar1 from '../assets/avatar-1.png';
import avatar2 from '../assets/avatar-2.png';


export default function Dashboard() {
    const [username, setUsername] = useState('');
    const [showPicker, setShowPicker] = useState(false);
    const [availableUsers, setAvailableUsers] = useState([]);
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api/v1';

    useEffect(() => {
        document.title = 'FaultyHermes - Home';
        const savedUsername = localStorage.getItem('hermes_username');
        if (savedUsername) {
            setUsername(savedUsername);
        } else {
            // No username in localStorage — fetch real users and show picker
            fetch(`${API_BASE_URL}/users/`)
                .then(r => r.json())
                .then(data => {
                    setAvailableUsers(data);
                    setShowPicker(true);
                })
                .catch(() => setUsername('there')); // graceful fallback
        }
    }, []);

    const handlePickUser = (name) => {
        localStorage.setItem('hermes_username', name);
        setUsername(name);
        setShowPicker(false);
    };

    // Mock Data
    const learningPartners = [
        { id: 1, name: 'Sarah Chen', ago: '2m ago', native: 'Chinese', learning: 'French', statusColor: '#22c55e', avatar: avatar1 },
        { id: 2, name: 'Marcus Rivera', ago: 'Online', native: 'Spanish', learning: 'French', statusColor: '#22c55e', avatar: avatar2 },
        { id: 3, name: 'Elena Papadopoulos', ago: '3h ago', native: 'Greek', learning: 'French', statusColor: '#9ca3af', avatar: avatar1 },
        { id: 4, name: 'John Smith', ago: '1d ago', native: 'English', learning: 'French', statusColor: '#9ca3af', avatar: avatar2 },
    ];

    const dailyQuests = [
        { id: 1, text: 'Complete 2 lessons', current: 2, max: 2, unit: '' },
        { id: 2, text: 'Chat with a partner', current: 5, max: 10, unit: ' min' },
        { id: 3, text: 'Correct 5 mistakes', current: 4, max: 5, unit: '' },
        { id: 4, text: 'Read for 15 minutes', current: 0, max: 15, unit: '' },
        { id: 5, text: 'Review new vocabulary', current: 0, max: 20, unit: '' },
    ];

    const globalLeaderboard = [
        { rank: 1, name: 'Alex Rivera', streak: 142, xp: '15,240', isYou: false, avatar: avatar1 },
        { rank: 2, name: 'Jamie Smith', streak: 89, xp: '14,890', isYou: false, avatar: avatar2 },
        { rank: 12, name: 'You (Hermes)', streak: 14, xp: '8,420', isYou: true, avatar: avatar1 },
    ];

    return (
        <div className="dash-container">
            {/* User Picker Overlay — shown only if no username in localStorage */}
            {showPicker && (
                <div style={{
                    position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    zIndex: 1000, backdropFilter: 'blur(8px)'
                }}>
                    <div style={{
                        background: '#fff', borderRadius: '20px', padding: '40px',
                        minWidth: '380px', textAlign: 'center',
                        boxShadow: '0 25px 60px rgba(0,0,0,0.2)'
                    }}>
                        <h2 style={{ margin: '0 0 8px', fontSize: '22px', fontWeight: 800, color: '#111827' }}>
                            Who are you? 👋
                        </h2>
                        <p style={{ color: '#6b7280', fontSize: '14px', marginBottom: '24px' }}>
                            Select your account to personalise the experience
                        </p>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                            {availableUsers.map(user => (
                                <button
                                    key={user.username}
                                    onClick={() => handlePickUser(user.username)}
                                    style={{
                                        padding: '14px 20px', borderRadius: '12px', border: '2px solid #f3f4f6',
                                        background: '#f9fafb', cursor: 'pointer', fontSize: '15px',
                                        fontWeight: 700, color: '#111827', transition: 'all 0.2s',
                                        textAlign: 'left'
                                    }}
                                    onMouseEnter={e => { e.target.style.borderColor = '#ea6506'; e.target.style.background = '#fff7f0'; }}
                                    onMouseLeave={e => { e.target.style.borderColor = '#f3f4f6'; e.target.style.background = '#f9fafb'; }}
                                >
                                    {user.username}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            )}
            {/* Header Area */}
            <header className="dash-header">
                <div className="dash-logo-block">
                    <div className="dash-logo-icon">
                        <img src={FaultyHermesLogo} alt="Logo" />
                    </div>
                    <span className="dash-logo-text">FaultyHermes</span>
                </div>
                <div className="dash-nav-container">
                    <nav className="dash-nav">
                        <Link to="/dashboard" className="dash-nav-link active">Dashboard</Link>
                        <Link to="#find-partner" className="dash-nav-link">Find Partner</Link>
                        <Link to="#lessons" className="dash-nav-link">Lessons</Link>
                        <Link to="/messages" className="dash-nav-link">Messages</Link>
                    </nav>
                    <div className="dash-diamonds-badge">
                        <img src={imgDiamond} alt="Diamonds" />
                        <span>500</span>
                    </div>
                    <div className="dash-bell-icon">
                        <img src={imgBell} alt="Notifications" />
                    </div>
                    <div className="dash-profile-avatar">
                        <img src={avatar1} alt="Profile" />
                    </div>
                </div>
            </header>

            {/* Welcome Banner */}
            <div className="dash-welcome-banner">
                <div className="welcome-text-block">
                    <h1>Welcome back, {username}!</h1>
                    <p>Ready to continue your French journey?</p>
                </div>
                <div className="dash-search-container">
                    <div className="dash-search-input-wrapper">
                        <img src={imgSearch} alt="Search" />
                        <input type="text" placeholder="Search people..." />
                    </div>
                </div>
            </div>

            {/* Main Content Grid */}
            <div className="dash-main-content">
                <div className="dash-grid-layout">

                    {/* --- ROW 1 --- */}

                    {/* Column 1: Learning Partners */}
                    <div className="dash-widget learning-partners-widget">
                        <div className="widget-header border-b">
                            <h3>Learning Partners</h3>
                            <button className="icon-btn">
                                <img src={imgAddPartner} alt="Add" />
                            </button>
                        </div>
                        <div className="widget-body p-sm">
                            {learningPartners.map(partner => (
                                <div key={partner.id} className="partner-item">
                                    <div className="partner-avatar-wrapper">
                                        <img src={partner.avatar} alt={partner.name} className="partner-avatar" />
                                        <div className="partner-status" style={{ backgroundColor: partner.statusColor }}></div>
                                    </div>
                                    <div className="partner-info">
                                        <div className="partner-top-row">
                                            <span className="partner-name">{partner.name}</span>
                                            <span className="partner-time">{partner.ago}</span>
                                        </div>
                                        <div className="partner-bottom-row">
                                            <span className="partner-native">Native: {partner.native}</span>
                                            <span className="partner-dot"></span>
                                            <span className="partner-learning">Learning: {partner.learning}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="widget-footer">
                            <button className="text-btn">Find New Partners</button>
                        </div>
                    </div>

                    {/* Column 2: Dashboard Center Wrapper (Streak + Course) */}
                    <div className="dash-col dash-col-center">
                        {/* Learning Streak Widget */}
                        <div className="dash-widget learning-streak-widget">
                            <div className="streak-header">
                                <div className="streak-icon-wrapper">
                                    <img src={imgFire} alt="Flame" />
                                </div>
                                <div className="streak-title-wrapper">
                                    <span>Current Streak</span>
                                    <h3>12 Days</h3>
                                </div>
                            </div>
                            <div className="streak-days">
                                {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, idx) => (
                                    <div key={idx} className="streak-day-item">
                                        <span className={idx === 4 ? "day-label active" : "day-label"}>{day}</span>
                                        <div className={`day-circle ${idx < 4 ? 'past' : idx === 4 ? 'today' : 'future'}`}>
                                            {idx < 4 && <img src={imgCheckSmall} alt="check" />}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Current Course Bento */}
                        <div className="dash-widget current-course-widget">
                            <div className="course-progress-bar-container">
                                <div className="course-progress-track">
                                    <div className="course-progress-fill" style={{ width: '70%' }}></div>
                                </div>
                                <span className="course-progress-text">70%</span>
                            </div>
                            <div className="course-main-info">
                                <span className="course-tag">Active Learning</span>
                                <h2>French Level B1</h2>
                                <p>Intermediate French: Mastering complex tenses and cultural nuances.</p>
                            </div>
                            <div className="course-actions">
                                <button className="btn-primary">Continue Lesson 14</button>
                                <button className="btn-secondary">Course Syllabus</button>
                            </div>
                        </div>
                    </div>

                    {/* Column 3: Daily Quests */}
                    <div className="dash-widget daily-quests-widget">
                        <div className="widget-header daily-quests-header">
                            <div className="quests-title">
                                <img src={imgQuest} alt="Quests" />
                                <h3>Daily Quests</h3>
                            </div>
                            <div className="quests-done-badge">2/5 DONE</div>
                        </div>
                        <div className="quests-list">
                            {dailyQuests.map(quest => (
                                <div key={quest.id} className="quest-item">
                                    <div className="quest-info">
                                        <span className="quest-text">{quest.text}</span>
                                        <span className="quest-progress">{quest.current}/{quest.max}{quest.unit}</span>
                                    </div>
                                    <div className="quest-progress-track">
                                        <div
                                            className="quest-progress-fill"
                                            style={{ width: `${(quest.current / quest.max) * 100}%` }}
                                        ></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <button className="claim-rewards-btn">Claim Rewards</button>
                    </div>

                    {/* --- ROW 2 --- */}

                    {/* Column 1: Weekly League */}
                    <div className="dash-widget weekly-league-widget">
                        <div className="league-glow-top"></div>
                        <div className="league-glow-bottom"></div>
                        <div className="league-content">
                            <div className="league-header">
                                <img src={imgTrophyWhite} alt="Trophy" />
                                <h3>Weekly League</h3>
                            </div>
                            <p>You're in the top 10! Keep learning to stay in the Diamond League.</p>
                            <div className="league-stats">
                                <div className="league-user-info">
                                    <span className="league-me">You</span>
                                    <span className="league-xp">1250 XP</span>
                                </div>
                                <img src={imgArrowUp} alt="Arrow Up" />
                            </div>
                        </div>
                    </div>

                    {/* Column 2 & 3: Global Leaderboard */}
                    <div className="dash-widget global-leaderboard-widget">
                        <div className="widget-header border-b leaderboard-header">
                            <div className="leaderboard-title">
                                <img src={imgTrophyDark} alt="Trophy" />
                                <h3>Global Leaderboard</h3>
                            </div>
                            <button className="view-all-btn">View All</button>
                        </div>
                        <div className="leaderboard-table">
                            <div className="leaderboard-tr header-row">
                                <div className="td-rank">Rank</div>
                                <div className="td-learner">Learner</div>
                                <div className="td-streak">Streak</div>
                                <div className="td-exp">Experience</div>
                            </div>
                            {globalLeaderboard.map((item, idx) => (
                                <div key={idx} className={`leaderboard-tr ${item.isYou ? 'you-row' : ''}`}>
                                    <div className="td-rank">
                                        <div className={`rank-badge rank-${item.rank}`}>
                                            {item.rank}
                                        </div>
                                    </div>
                                    <div className="td-learner">
                                        <img src={item.avatar} alt={item.name} className="learner-avatar" />
                                        <span>{item.name}</span>
                                    </div>
                                    <div className="td-streak">
                                        <span>🔥 {item.streak} days</span>
                                    </div>
                                    <div className="td-exp">
                                        <div className="exp-badge">
                                            {item.xp} XP
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
