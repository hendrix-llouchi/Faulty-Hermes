import React, { useState, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import './Introduction.css';
import { useEffect } from 'react';

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
    useEffect(() => {
        document.title = 'FaultyHermes - Introduction';
    }, []);

    const navigate = useNavigate();
    const [bio, setBio] = useState('');
    const [selectedInterests, setSelectedInterests] = useState([]);
    const [customInterests, setCustomInterests] = useState([]);
    const [showAddInput, setShowAddInput] = useState(false);
    const [addInputValue, setAddInputValue] = useState('');
    const addInputRef = useRef(null);
    const [profileImage, setProfileImage] = useState(null);
    const [isDragging, setIsDragging] = useState(false);
    const fileInputRef = useRef(null);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file && file.type.startsWith('image/')) {
            setProfileImage(URL.createObjectURL(file));
        }
    };

    const handleDragOver = useCallback((e) => {
        e.preventDefault();
        setIsDragging(true);
    }, []);

    const handleDragLeave = useCallback((e) => {
        e.preventDefault();
        setIsDragging(false);
    }, []);

    const handleDrop = useCallback((e) => {
        e.preventDefault();
        setIsDragging(false);
        const file = e.dataTransfer.files[0];
        if (file && file.type.startsWith('image/')) {
            setProfileImage(URL.createObjectURL(file));
        }
    }, []);

    const triggerFileInput = () => fileInputRef.current?.click();

    const removeProfileImage = (e) => {
        e.stopPropagation();
        setProfileImage(null);
        if (fileInputRef.current) fileInputRef.current.value = '';
    };

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

    const openAddInput = () => {
        setShowAddInput(true);
        setAddInputValue('');
        // Focus after render
        setTimeout(() => addInputRef.current?.focus(), 0);
    };

    const confirmAddInterest = () => {
        const trimmed = addInputValue.trim();
        if (!trimmed) { cancelAddInterest(); return; }
        const id = `custom-${Date.now()}`;
        setCustomInterests(prev => [...prev, { id, label: trimmed }]);
        setSelectedInterests(prev => [...prev, id]);
        setShowAddInput(false);
        setAddInputValue('');
    };

    const cancelAddInterest = () => {
        setShowAddInput(false);
        setAddInputValue('');
    };

    const handleAddInputKeyDown = (e) => {
        if (e.key === 'Enter') { e.preventDefault(); confirmAddInterest(); }
        if (e.key === 'Escape') { cancelAddInterest(); }
    };

    const removeCustomInterest = (id, e) => {
        e.stopPropagation();
        setCustomInterests(prev => prev.filter(ci => ci.id !== id));
        setSelectedInterests(prev => prev.filter(sid => sid !== id));
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
                    <div
                        className={`profile-photo-card${isDragging ? ' dragging' : ''}`}
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
                        onClick={triggerFileInput}
                        style={{ cursor: 'pointer' }}
                    >
                        <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/png, image/jpeg, image/svg+xml, image/webp"
                            style={{ display: 'none' }}
                            onChange={handleFileChange}
                            onClick={(e) => e.stopPropagation()}
                        />
                        <div className="profile-avatar-wrapper">
                            <div className={`profile-avatar-upload${profileImage ? ' has-image' : ''}`}>
                                {profileImage ? (
                                    <img src={profileImage} alt="Profile" className="profile-preview-img" />
                                ) : (
                                    <img src={imgCamera} alt="Upload" className="camera-icon" />
                                )}
                            </div>
                            <div
                                className="profile-edit-btn"
                                onClick={(e) => { e.stopPropagation(); triggerFileInput(); }}
                                title="Change photo"
                            >
                                <img src={imgEdit} alt="Edit" className="edit-icon" />
                            </div>
                        </div>
                        <h2 className="profile-photo-title">Profile Photo</h2>
                        {profileImage ? (
                            <p className="profile-photo-subtitle">
                                <span className="upload-link" onClick={(e) => { e.stopPropagation(); triggerFileInput(); }}>Change photo</span>
                                {' or '}
                                <span className="remove-link" onClick={removeProfileImage}>Remove</span>
                            </p>
                        ) : (
                            <p className="profile-photo-subtitle">
                                <span className="upload-link">Click to upload</span> or drag and drop<br />
                                <span className="file-info">SVG, PNG, JPG (max. 800x400px)</span>
                            </p>
                        )}
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

                            {/* Custom interests */}
                            {customInterests.map(ci => (
                                <button
                                    key={ci.id}
                                    type="button"
                                    className={`interest-btn custom-interest-btn ${selectedInterests.includes(ci.id) ? 'selected' : ''}`}
                                    onClick={() => toggleInterest(ci.id)}
                                >
                                    <span>{ci.label}</span>
                                    <span
                                        className="custom-interest-remove"
                                        onClick={(e) => removeCustomInterest(ci.id, e)}
                                        title="Remove"
                                    >✕</span>
                                </button>
                            ))}

                            {/* Add More — inline input or trigger button */}
                            {showAddInput ? (
                                <div className="add-interest-input-wrapper">
                                    <input
                                        ref={addInputRef}
                                        type="text"
                                        className="add-interest-input"
                                        placeholder="e.g. Yoga"
                                        value={addInputValue}
                                        onChange={(e) => setAddInputValue(e.target.value)}
                                        onKeyDown={handleAddInputKeyDown}
                                        onBlur={cancelAddInterest}
                                        maxLength={30}
                                    />
                                    <button
                                        type="button"
                                        className="add-interest-confirm-btn"
                                        onMouseDown={(e) => { e.preventDefault(); confirmAddInterest(); }}
                                        title="Add interest"
                                    >✓</button>
                                </div>
                            ) : (
                                <button type="button" className="interest-btn add-more-btn" onClick={openAddInput}>
                                    <span className="plus-icon">+</span>
                                    <span>Add More</span>
                                </button>
                            )}
                        </div>
                    </div>
                </div>

                <div className="intro-actions">
                    <button type="button" className="btn-back" onClick={() => navigate('/signup')}>
                        <img src={imgBack} alt="Back" className="btn-icon" />
                        <span>BACK</span>
                    </button>
                    <button type="button" className="btn-next" onClick={() => navigate('/target-language')}>
                        <span>NEXT STEP</span>
                        <img src={imgNext} alt="Next" className="btn-icon" />
                    </button>
                </div>
            </div>
        </div>
    );
}
