import React, { useState } from 'react';
import './Input.css';

import imgEye from '../assets/visibility-eye-Icon.svg';

/**
 * Reusable Input component based on Figma designs.
 * 
 * @param {string} icon - The URL of the icon image.
 * @param {string} placeholder - The placeholder text.
 * @param {string} type - The type of the input.
 * @param {string} value - The current value.
 * @param {function} onChange - Change handler.
 * @param {string} className - Optional extra CSS class for variant styling.
 * @param {boolean} showPasswordToggle - Whether to show the password visibility toggle icon.
 */
export default function Input({ icon, placeholder, type = 'text', value, onChange, className = '', showPasswordToggle = false }) {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const inputType = type === 'password' && isPasswordVisible ? 'text' : type;

    return (
        <div className={`input-field-container ${className}`}>
            <div className="input-field-icon-wrapper">
                <img src={icon} alt="" className="input-field-icon" />
            </div>
            <div className="input-field-input-wrapper">
                <input
                    type={inputType}
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                    className="input-field-element"
                />
            </div>
            {(type === 'password' || showPasswordToggle) && (
                <div className="input-field-eye-wrapper" onClick={() => setIsPasswordVisible(!isPasswordVisible)}>
                    <img src={imgEye} alt="Toggle visibility" className="input-field-eye-icon" />
                </div>
            )}
        </div>
    );
}
