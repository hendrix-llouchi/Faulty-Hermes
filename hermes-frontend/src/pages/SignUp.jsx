import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SignUp.css';
import Input from '../components/Input';
import { useEffect } from 'react';
import FaultyHermesLogo from '/FaultyHermesLogo.png'

import imgLogo from '../assets/logo-Icon.svg';
import imgEmail from '../assets/email-Icon.svg';
import imgUser from '../assets/profile-icon.svg';
import imgLock from '../assets/password-Icon.svg';
import imgGoogle from '../assets/devicon_google.svg';

export default function SignUp() {
    useEffect(() => {
        document.title = 'FaultyHermes - SignUp';
    }, []);
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [agreedToTerms, setAgreedToTerms] = useState(false);

    const isDisabled =
        email.trim() === '' ||
        username.trim() === '' ||
        password === '' ||
        confirmPassword === '' ||
        !agreedToTerms;
    return (
        <div className="signup-container">
            <div className="signup-card">
                <div className="signup-header">
                    <div className="signup-logo-container">
                        <img src={FaultyHermesLogo} alt="Logo" className="signup-logo-icon" />
                    </div>
                    <h1 className="signup-title">Join FAULTYHERMES</h1>
                    <p className="signup-subtitle">
                        Connect, learn, and master languages with a global community.
                    </p>
                </div>

                <form className="signup-form" onSubmit={(e) => { e.preventDefault(); navigate('/introduction'); }}>
                    <div className="form-group">
                        <label>Email address</label>
                        <Input
                            icon={imgEmail}
                            placeholder="you@example.com"
                            type="email"
                            className="variant-signup"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div className="form-group">
                        <label>Username</label>
                        <Input
                            icon={imgUser}
                            placeholder="Choose a handle"
                            type="text"
                            className="variant-signup"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>

                    <div className="form-group">
                        <label>Password</label>
                        <Input
                            icon={imgLock}
                            placeholder="••••••••"
                            type="password"
                            className="variant-signup"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <div className="form-group">
                        <label>Confirm Password</label>
                        <Input
                            icon={imgLock}
                            placeholder="••••••••"
                            type="password"
                            className="variant-signup"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </div>

                    <div className="terms-checkbox">
                        <input
                            type="checkbox"
                            className="checkbox-input"
                            id="terms"
                            checked={agreedToTerms}
                            onChange={(e) => setAgreedToTerms(e.target.checked)}
                        />
                        <label htmlFor="terms" className="terms-label">
                            I agree to the <a href="#" className="terms-link">Terms</a> and <a href="#" className="terms-link">Privacy Policy</a>
                        </label>
                    </div>

                    <button type="submit" className="btn-signup-primary" disabled={isDisabled}>SIGN UP</button>
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
