import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SignUp.css';
import Input from '../components/Input';
import { useEffect } from 'react';

import imgLogo from '../assets/logo-Icon.svg';
import imgEmail from '../assets/email-Icon.svg';
import imgUser from '../assets/profile-icon.svg';
import imgLock from '../assets/password-Icon.svg';
import imgGoogle from '../assets/devicon_google.svg';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api/v1';

export default function SignUp() {
    useEffect(() => {
        document.title = 'FaultyHermes - SignUp';
    }, []);

    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        username: '',
        password: '',
        confirmPassword: ''
    });
    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (field) => (e) => {
        setFormData({ ...formData, [field]: e.target.value });
    };

    const handleSignUp = async (e) => {
        e.preventDefault();
        setError('');

        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        setIsSubmitting(true);
        try {
            const response = await fetch(`${API_BASE_URL}/users/register/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: formData.email,
                    username: formData.username,
                    password: formData.password,
                    target_lang: 'fr' // Defaulting to 'fr' as requested
                }),
            });

            if (response.ok) {
                // Save username so Dashboard can personalize the welcome message
                localStorage.setItem('hermes_username', formData.username);
                // Success: Navigate to TargetLanguage page as per feedback
                navigate('/target-language');
            } else {
                const data = await response.json();

                // DRF returns errors as an object with field names as keys
                // We'll flatten them into a single string for display
                let errorMessage = '';
                if (data && typeof data === 'object') {
                    if (data.detail) {
                        errorMessage = data.detail;
                    } else {
                        errorMessage = Object.keys(data)
                            .map(key => `${key}: ${Array.isArray(data[key]) ? data[key].join(', ') : data[key]}`)
                            .join(' | ');
                    }
                } else {
                    errorMessage = 'Registration failed';
                }

                setError(errorMessage);
            }
        } catch (err) {
            setError('Network error. Is the backend running?');
            console.error('SignUp Error:', err);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="signup-container">
            <div className="signup-card">
                <div className="signup-header">
                    <div className="signup-logo-container">
                        <img src={imgLogo} alt="Logo" className="signup-logo-icon" />
                    </div>
                    <h1 className="signup-title">Join FAULTYHERMES</h1>
                    <p className="signup-subtitle">
                        Connect, learn, and master languages with a global community.
                    </p>
                </div>

                <form className="signup-form" onSubmit={handleSignUp}>
                    {error && <div className="error-message" style={{ color: '#ef4444', marginBottom: '15px', fontSize: '14px', textAlign: 'center' }}>{error}</div>}
                    <div className="form-group">
                        <label>Email address</label>
                        <Input
                            icon={imgEmail}
                            placeholder="you@example.com"
                            type="email"
                            className="variant-signup"
                            value={formData.email}
                            onChange={handleChange('email')}
                        />
                    </div>

                    <div className="form-group">
                        <label>Username</label>
                        <Input
                            icon={imgUser}
                            placeholder="Choose a handle"
                            type="text"
                            className="variant-signup"
                            value={formData.username}
                            onChange={handleChange('username')}
                        />
                    </div>

                    <div className="form-group">
                        <label>Password</label>
                        <Input
                            icon={imgLock}
                            placeholder="••••••••"
                            type="password"
                            className="variant-signup"
                            value={formData.password}
                            onChange={handleChange('password')}
                        />
                    </div>

                    <div className="form-group">
                        <label>Confirm Password</label>
                        <Input
                            icon={imgLock}
                            placeholder="••••••••"
                            type="password"
                            className="variant-signup"
                            value={formData.confirmPassword}
                            onChange={handleChange('confirmPassword')}
                        />
                    </div>

                    <div className="terms-checkbox">
                        <input type="checkbox" className="checkbox-input" id="terms" required />
                        <label htmlFor="terms" className="terms-label">
                            I agree to the <a href="#" className="terms-link">Terms</a> and <a href="#" className="terms-link">Privacy Policy</a>
                        </label>
                    </div>

                    <button type="submit" className="btn-signup-primary" disabled={isSubmitting}>
                        {isSubmitting ? 'SIGNING UP...' : 'SIGN UP'}
                    </button>
                </form>

                <div className="signup-social-divider">
                    <div className="divider-line"></div>
                    <span className="divider-text">OR CONTINUE WITH</span>
                    <div className="divider-line"></div>
                </div>

                <div className="signup-social-login" style={{ display: 'flex', justifyContent: 'center' }}>
                    <button type="button" className="social-btn">
                        <img src={imgGoogle} alt="Google" />
                        <span>Continue with Google</span>
                    </button>
                </div>

                <div className="signup-footer">
                    <p>
                        Already have an account? <a href="#" onClick={(e) => { e.preventDefault(); navigate('/login'); }}>Back to Login</a>
                    </p>
                </div>
            </div>
        </div>
    );
}
