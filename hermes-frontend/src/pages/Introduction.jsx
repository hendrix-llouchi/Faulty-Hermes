import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Introduction.css';

// Local asset imports
import imgProfilePlaceholder from '../assets/profile-placeholder.png';
import imgCamera from '../assets/camera-icon.svg';
import imgEdit from '../assets/edit-icon.svg';
import imgBio from '../assets/bio-icon.svg';
import imgTravel from '../assets/travel-icon.svg';
import imgMusic from '../assets/music-icon.svg';
import imgTech from '../assets/tech-icon.svg';
import imgFood from '../assets/food-icon.svg';
import imgArt from '../assets/art-icon.svg';
import imgGaming from '../assets/gaming-icon.svg';
import imgNature from '../assets/nature-icon.svg';
import imgCinema from '../assets/cinema-icon.svg';
import imgBack from '../assets/back-icon.svg';
import imgNext from '../assets/next-icon.svg';

export default function Introduction() {
    const navigate = useNavigate();
    const [bio, setBio] = useState('');
    const [selectedInterests, setSelectedInterests] = useState([]);

    const interests = [
        { id: 'travel', label: 'Travel', icon: imgTravel },
        { id: 'music', label: 'Music', icon: imgMusic },
        { id: 'tech', label: 'Tech', icon: imgTech },
        { id: 'food', label: 'Food & Drink', icon: imgFood },
        { id: 'art', label: 'Art & Design', icon: imgArt },
        { id: 'gaming', label: 'Gaming', icon: imgGaming },
        { id: 'nature', label: 'Nature', icon: imgNature },
        { id: 'cinema', label: 'Cinema', icon: imgCinema },
    ];

    const toggleInterest = (id) => {
        if (selectedInterests.includes(id)) {
            setSelectedInterests(selectedInterests.filter(interestId => interestId !== id));
        } else {
            setSelectedInterests([...selectedInterests, id]);
        }
    };

    return (
        <div className="intro-container">
            <div className="intro-main">
                <div className="intro-header">
                    <h1 className="intro-title">Tell us about yourself</h1>
                    <p className="intro-subtitle">Let the community know who you are to get better matches.</p>
                </div>

                <div className="intro-form">
                    {/* Profile Photo Section */}
                    <div className="profile-photo-card">
                        <div className="profile-avatar-wrapper">
                            <div className="profile-avatar-upload">
                                <img src={imgCamera} alt="Upload" className="camera-icon" />
                            </div>
                            <div className="profile-edit-btn">
                                <img src={imgEdit} alt="Edit" className="edit-icon" />
                            </div>
                        </div>
                        <h2 className="profile-photo-title">Profile Photo</h2>
                        <p className="profile-photo-subtitle">
                            <span className="upload-link">Click to upload</span> or drag and drop<br />
                            <span className="file-info">SVG, PNG, JPG (max. 800x400px)</span>
                        </p>
                    </div>

                    {/* Bio Section */}
                    <div className="bio-card">
                        <div className="bio-header">
                            <div className="bio-title-wrapper">
                                <img src={imgBio} alt="Bio" className="bio-icon" />
                                <h2 className="bio-title">Your Bio</h2>
                            </div>
                            <span className="badge-public">PUBLIC</span>
                        </div>

                        <div className="bio-textarea-wrapper">
                            <textarea
                                className="bio-textarea"
                                placeholder="Hola! I'm a UX designer learning Spanish. I love spicy food, hiking, and indie rock. Looking for conversation partners to practice with on weekends..."
                                value={bio}
                                onChange={(e) => setBio(e.target.value)}
                                maxLength={160}
                            />
                            <div className="bio-char-count">
                                {bio.length}/160
                            </div>
                        </div>
                    </div>

                    {/* Interests Section */}
                    <div className="interests-card">
                        <div className="interests-header">
                            <h2 className="interests-title">Interests & Topics</h2>
                            <p className="interests-subtitle">Select at least 3 topics to help us personalize your feed.</p>
                        </div>

                        <div className="interests-tags">
                            {interests.map(interest => (
                                <button
                                    key={interest.id}
                                    type="button"
                                    className={`interest-btn ${selectedInterests.includes(interest.id) ? 'selected' : ''}`}
                                    onClick={() => toggleInterest(interest.id)}
                                >
                                    <img src={interest.icon} alt={interest.label} className="interest-icon" />
                                    <span>{interest.label}</span>
                                </button>
                            ))}
                            <button type="button" className="interest-btn add-more-btn">
                                <span className="plus-icon">+</span>
                                <span>Add More</span>
                            </button>
                        </div>
                    </div>
                </div>

                <div className="intro-actions">
                    <button type="button" className="btn-back" onClick={() => navigate('/signup')}>
                        <img src={imgBack} alt="Back" className="btn-icon" />
                        <span>BACK</span>
                    </button>
                    <button type="button" className="btn-next" onClick={() => navigate('/')}>
                        <span>NEXT STEP</span>
                        <img src={imgNext} alt="Next" className="btn-icon" />
                    </button>
                </div>
            </div>
        </div>
    );
}
