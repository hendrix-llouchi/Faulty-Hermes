import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './Chat.css';
import FaultyHermesLogo from '/FaultyHermesLogo.png';
import imgBack from '../assets/back-icon.svg';
import avatar1 from '../assets/avatar-1.png';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api/v1';

export default function Chat() {
    const navigate = useNavigate();
    const sender = localStorage.getItem('hermes_username') || 'hendrix_llouchi';

    const [messages, setMessages] = useState([]);
    const [contacts, setContacts] = useState([]);       // users I've added
    const [newUsers, setNewUsers] = useState([]);        // users I haven't added yet
    const [recipient, setRecipient] = useState('');
    const [inputText, setInputText] = useState('');
    const [isSending, setIsSending] = useState(false);
    const [addingUser, setAddingUser] = useState(null);  // username being added
    const messagesEndRef = useRef(null);

    // Filter to only show the active conversation
    const conversationMessages = messages.filter(msg =>
        (msg.sender === sender && msg.recipient === recipient) ||
        (msg.sender === recipient && msg.recipient === sender)
    );

    useEffect(() => {
        fetchAll();
        const interval = setInterval(fetchAll, 3000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const fetchAll = () => {
        fetchMessages();
        fetchContacts();
        fetchNewUsers();
    };

    const fetchMessages = async () => {
        try {
            const res = await fetch(`${API_BASE_URL}/chat/messages/`);
            if (res.ok) setMessages(await res.json());
        } catch (e) { console.error('fetchMessages:', e); }
    };

    const fetchContacts = async () => {
        try {
            const res = await fetch(`${API_BASE_URL}/users/contacts/?username=${sender}`);
            if (res.ok) setContacts(await res.json());
        } catch (e) { console.error('fetchContacts:', e); }
    };

    const fetchNewUsers = async () => {
        try {
            const res = await fetch(`${API_BASE_URL}/users/new/?username=${sender}`);
            if (res.ok) setNewUsers(await res.json());
        } catch (e) { console.error('fetchNewUsers:', e); }
    };

    const addContact = async (contactUsername) => {
        setAddingUser(contactUsername);
        try {
            const res = await fetch(`${API_BASE_URL}/users/contacts/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username: sender, contact_username: contactUsername }),
            });
            if (res.ok) {
                await fetchContacts();
                await fetchNewUsers();
                setRecipient(contactUsername); // auto-select the added user
            }
        } catch (e) { console.error('addContact:', e); }
        finally { setAddingUser(null); }
    };

    const sendMessage = async (e) => {
        e.preventDefault();
        if (!inputText.trim() || !recipient) return;
        setIsSending(true);
        try {
            const res = await fetch(`${API_BASE_URL}/chat/messages/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ sender, recipient, original_text: inputText }),
            });
            if (res.ok) { setInputText(''); fetchMessages(); }
        } catch (e) { console.error('sendMessage:', e); }
        finally { setIsSending(false); }
    };

    return (
        <div className="chat-container">
            <header className="chat-header">
                <div className="header-left">
                    <button className="back-btn" onClick={() => navigate('/dashboard')}>
                        <img src={imgBack} alt="Back" />
                    </button>
                    <div className="chat-recipient-info">
                        <div className="recipient-avatar">
                            <img src={avatar1} alt={recipient} />
                            <div className="online-indicator"></div>
                        </div>
                        <div className="recipient-details">
                            <h2>{recipient ? `Chatting with ${recipient}` : 'FaultyHermes Chat'}</h2>
                            <span>{recipient ? 'Online' : 'Select a contact to start'}</span>
                        </div>
                    </div>
                </div>
                <div className="header-center">
                    <div className="chat-logo">
                        <img src={FaultyHermesLogo} alt="Logo" />
                        <span>FaultyHermes Chat</span>
                    </div>
                </div>
                <div className="header-right">
                    <button className="refresh-btn" onClick={fetchAll}>Refresh</button>
                </div>
            </header>

            <div className="chat-main-layout">
                {/* ── Sidebar ── */}
                <aside className="chat-sidebar">

                    {/* NEW PEOPLE section — users not yet added */}
                    {newUsers.length > 0 && (
                        <div className="sidebar-section">
                            <div className="sidebar-header new-people-header">
                                <h3>New People</h3>
                                <span className="new-badge">{newUsers.length}</span>
                            </div>
                            <div className="user-list">
                                {newUsers.map(user => (
                                    <div key={user.username} className="user-item new-user-item">
                                        <div className="user-avatar-small">
                                            <img src={avatar1} alt={user.username} />
                                            <div className="user-status-dot"></div>
                                        </div>
                                        <div className="user-item-info">
                                            <span className="user-item-name">{user.username}</span>
                                            <span className="user-item-status">Just joined</span>
                                        </div>
                                        <button
                                            className="add-contact-btn"
                                            disabled={addingUser === user.username}
                                            onClick={() => addContact(user.username)}
                                        >
                                            {addingUser === user.username ? '...' : '+ Add'}
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* CONTACTS section — users I've added */}
                    <div className="sidebar-section">
                        <div className="sidebar-header">
                            <h3>My Contacts</h3>
                        </div>
                        <div className="user-list">
                            {contacts.length === 0 ? (
                                <p className="empty-contacts">Add people above to start chatting</p>
                            ) : (
                                contacts.map(user => (
                                    <div
                                        key={user.username}
                                        className={`user-item ${recipient === user.username ? 'active' : ''}`}
                                        onClick={() => setRecipient(user.username)}
                                    >
                                        <div className="user-avatar-small">
                                            <img src={avatar1} alt={user.username} />
                                            <div className="user-status-dot"></div>
                                        </div>
                                        <div className="user-item-info">
                                            <span className="user-item-name">{user.username}</span>
                                            <span className="user-item-status">Contact</span>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </aside>

                {/* ── Chat Area ── */}
                <div className="chat-content-wrapper">
                    <main className="chat-messages-area">
                        {!recipient ? (
                            <div className="empty-chat">
                                <p>👈 Select a contact from the left to start chatting</p>
                            </div>
                        ) : conversationMessages.length === 0 ? (
                            <div className="empty-chat">
                                <p>No messages yet with {recipient}. Say something! 👋</p>
                            </div>
                        ) : (
                            conversationMessages.map((msg, idx) => (
                                <div key={msg.id || idx} className={`message-row ${msg.sender === sender ? 'sent' : 'received'}`}>
                                    <div className="message-bubble">
                                        <div className="text-section original">
                                            <label>Original ({msg.sender})</label>
                                            <p>{msg.original_text}</p>
                                        </div>
                                        {/* Only show translation on RECEIVED messages — translated into YOUR target language */}
                                        {msg.sender !== sender && (
                                            <>
                                                <div className="text-divider"></div>
                                                <div className="text-section translated">
                                                    <label>Translated</label>
                                                    {msg.translated_text
                                                        ? <p>{msg.translated_text}</p>
                                                        : <p className="translating">Translating...</p>
                                                    }
                                                </div>
                                            </>
                                        )}
                                        <span className="message-time">
                                            {new Date(msg.timestamp || Date.now()).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                        </span>
                                    </div>
                                </div>
                            ))
                        )}
                        <div ref={messagesEndRef} />
                    </main>

                    <footer className="chat-input-area">
                        <form className="chat-input-wrapper" onSubmit={sendMessage}>
                            <input
                                type="text"
                                placeholder={recipient ? `Message ${recipient}...` : 'Select a contact first...'}
                                value={inputText}
                                onChange={(e) => setInputText(e.target.value)}
                                disabled={isSending || !recipient}
                            />
                            <button type="submit" className="send-btn" disabled={isSending || !inputText.trim() || !recipient}>
                                {isSending ? '...' : 'Send'}
                            </button>
                        </form>
                    </footer>
                </div>
            </div>
        </div>
    );
}
