import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import Input from '../components/Input';
import FaultyHermesLogo from '/FaultyHermesLogo.png'
import { useEffect } from 'react';

import imgContainer from '../assets/logo-Icon.svg';
import imgUser from '../assets/profile-icon.svg';
import imgLock from '../assets/password-Icon.svg';
import imgDeviconGoogle from '../assets/devicon_google.svg';

export default function Login() {
    useEffect(() => {
        document.title = 'FaultyHermes - Login';
    }, []);
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const isDisabled = email.trim() === '' || password === '';
    return (
        <div className="login-container">
            <div className="login-wrapper">
                <div className="login-card">
                    <div className="login-header">
                        <div className="logo-container">
                            <img src={FaultyHermesLogo} alt="Logo" className="logo-icon" />
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
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
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
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        <div className="login-actions">
                            <button type="submit" className="btn-primary" disabled={isDisabled}>LOGIN</button>
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

            </div>
        </div>
    );
}
