import React from 'react';
import { useNavigate } from 'react-router-dom';
import './SignUp.css';
import Input from '../components/Input';

import imgLogo from '../assets/logo-Icon.svg';
import imgEmail from '../assets/email-Icon.svg';
import imgUser from '../assets/profile-icon.svg';
import imgLock from '../assets/password-Icon.svg';
import imgGoogle from '../assets/devicon_google.svg';

export default function SignUp() {
    const navigate = useNavigate();
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

                <form className="signup-form" onSubmit={(e) => e.preventDefault()}>
                    <div className="form-group">
                        <label>Email address</label>
                        <Input
                            icon={imgEmail}
                            placeholder="you@example.com"
                            type="email"
                            className="variant-signup"
                        />
                    </div>

                    <div className="form-group">
                        <label>Username</label>
                        <Input
                            icon={imgUser}
                            placeholder="Choose a handle"
                            type="text"
                            className="variant-signup"
                        />
                    </div>

                    <div className="form-group">
                        <label>Password</label>
                        <Input
                            icon={imgLock}
                            placeholder="••••••••"
                            type="password"
                            className="variant-signup"
                        />
                    </div>

                    <div className="form-group">
                        <label>Confirm Password</label>
                        <Input
                            icon={imgLock}
                            placeholder="••••••••"
                            type="password"
                            className="variant-signup"
                        />
                    </div>

                    <div className="terms-checkbox">
                        <input type="checkbox" className="checkbox-input" id="terms" />
                        <label htmlFor="terms" className="terms-label">
                            I agree to the <a href="#" className="terms-link">Terms</a> and <a href="#" className="terms-link">Privacy Policy</a>
                        </label>
                    </div>

                    <button type="submit" className="btn-signup-primary">SIGN UP</button>
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
