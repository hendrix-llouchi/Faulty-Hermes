import React from 'react';
import { useNavigate } from 'react-router-dom';
import './SignUp.css';
import Input from '../components/Input';

const imgLogo = "http://localhost:3845/assets/0e82f9ae5dabab469186c103e29a2aee4f350fbe.svg";
const imgEmail = `data:image/svg+xml,${encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="15" height="13" viewBox="0 0 15 13" fill="none"><path d="M7.48828 5.27344L13.5 1.51172H1.47656L7.48828 5.27344ZM13.5 10.5117V3.02344L7.48828 6.75L1.47656 3.02344V10.5117H13.5ZM13.5 0C13.8984 0 14.2441 0.152344 14.5371 0.457031C14.8301 0.761719 14.9766 1.11328 14.9766 1.51172V10.5117C14.9766 10.9102 14.8301 11.2617 14.5371 11.5664C14.2441 11.8711 13.8984 12.0234 13.5 12.0234H1.47656C1.07812 12.0234 0.732422 11.8711 0.439453 11.5664C0.146484 11.2617 0 10.9102 0 10.5117V1.51172C0 1.11328 0.146484 0.761719 0.439453 0.457031C0.732422 0.152344 1.07812 0 1.47656 0H13.5Z" fill="#6B7280"/></svg>')}`;
const imgUser = "http://localhost:3845/assets/0a7ad6decc157906ddab960345b0ecb4b4fb5a92.svg";
const imgLock = `data:image/svg+xml,${encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="13" height="16" viewBox="0 0 13 16" fill="none"><path d="M10.5117 14.2734V6.75H1.51172V14.2734H10.5117ZM3.69141 3.76172V5.27344H8.33203V3.76172C8.33203 3.12891 8.10352 2.58398 7.64648 2.12695C7.18945 1.66992 6.64453 1.44141 6.01172 1.44141C5.37891 1.44141 4.83398 1.66992 4.37695 2.12695C3.91992 2.58398 3.69141 3.12891 3.69141 3.76172ZM10.5117 5.27344C10.9102 5.27344 11.2617 5.41992 11.5664 5.71289C11.8711 6.00586 12.0234 6.35156 12.0234 6.75V14.2734C12.0234 14.6719 11.8711 15.0176 11.5664 15.3105C11.2617 15.6035 10.9102 15.75 10.5117 15.75H1.51172C1.11328 15.75 0.761719 15.6035 0.457031 15.3105C0.152344 15.0176 0 14.6719 0 14.2734V6.75C0 6.35156 0.152344 6.00586 0.457031 5.71289C0.761719 5.41992 1.11328 5.27344 1.51172 5.27344H2.25V3.76172C2.25 2.73047 2.61914 1.8457 3.35742 1.10742C4.0957 0.369141 4.98047 0 6.01172 0C7.04297 0 7.92773 0.369141 8.66602 1.10742C9.4043 1.8457 9.77344 2.73047 9.77344 3.76172V5.27344H10.5117ZM7.06641 11.5664C6.76172 11.8711 6.41016 12.0234 6.01172 12.0234C5.61328 12.0234 5.26172 11.8711 4.95703 11.5664C4.65234 11.2617 4.5 10.9102 4.5 10.5117C4.5 10.1133 4.65234 9.76172 4.95703 9.45703C5.26172 9.15234 5.61328 9 6.01172 9C6.41016 9 6.76172 9.15234 7.06641 9.45703C7.37109 9.76172 7.52344 10.1133 7.52344 10.5117C7.52344 10.9102 7.37109 11.2617 7.06641 11.5664Z" fill="#6B7280"/></svg>')}`;
const imgGoogle = "http://localhost:3845/assets/0971b7f5984a5934ce0bf942ab4431515836c0ba.svg";
const imgLinkedin = "http://localhost:3845/assets/999a5e909ae1999e74c6da74dbd1864061971920.svg";

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

                <div className="signup-social-login">
                    <button type="button" className="social-btn">
                        <img src={imgGoogle} alt="Google" />
                        <span>Google</span>
                    </button>
                    <button type="button" className="social-btn">
                        <img src={imgLinkedin} alt="LinkedIn" />
                        <span>LinkedIn</span>
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
