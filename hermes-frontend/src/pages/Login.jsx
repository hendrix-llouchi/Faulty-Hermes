import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import Input from '../components/Input';

import imgContainer from '../assets/logo-Icon.svg';
import imgUser from '../assets/profile-icon.svg';
import imgLock from '../assets/password-Icon.svg';
import imgDeviconGoogle from '../assets/devicon_google.svg';

export default function Login() {
    const navigate = useNavigate();
    return (
        <div className="login-container">
            <div className="login-wrapper">
                <div className="login-card">
                    <div className="login-header">
                        <div className="logo-container">
                            <img src={imgContainer} alt="Logo" className="logo-icon" />
                        </div>
                        <h1 className="login-title">FAULTYHERMES</h1>
                        <p className="login-subtitle"></p>
                    </div>

                    <form className="login-form" onSubmit={(e) => e.preventDefault()}>
                        <div className="form-group">
                            <label>Username</label>
                            <Input
                                icon={imgUser}
                                placeholder="Enter your username"
                                type="text"
                                className="variant-signup"
                            />
                        </div>

                        <div className="form-group">
                            <div className="label-row">
                                <label>Password</label>
                                <a href="#" className="forgot-password">Forgot Password?</a>
                            </div>
                            <Input
                                icon={imgLock}
                                placeholder="Enter your password"
                                type="password"
                                className="variant-signup"
                                showPasswordToggle={true}
                            />
                        </div>

                        <div className="login-actions">
                            <button type="submit" className="btn-primary">LOGIN</button>
                            <button
                                type="button"
                                className="btn-secondary"
                                onClick={() => navigate('/signup')}
                            >
                                CREATE AN ACCOUNT
                            </button>
                        </div>
                    </form>

                    <div className="social-divider">
                        <div className="divider-line"></div>
                        <span className="divider-text">OR CONTINUE WITH</span>
                        <div className="divider-line"></div>
                    </div>

                    <div className="social-login" style={{ display: 'flex', justifyContent: 'center' }}>
                        <button type="button" className="btn-social">
                            <img src={imgDeviconGoogle} alt="Google" />
                            <span>Continue with Google</span>
                        </button>
                    </div>
                </div>

                <div className="login-footer">
                    <p>© 2023 Faultyhermes Platform. All rights reserved.</p>
                    <p>
                        <a href="#">Privacy Policy</a> • <a href="#">Terms of Service</a>
                    </p>
                </div>
            </div>
        </div>
    );
}
