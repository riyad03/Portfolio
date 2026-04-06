import React, { useState } from 'react';

const AdminAuth = ({ onAuthenticate, onCancel, defaultPassword }) => {
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (password === defaultPassword) {
            onAuthenticate();
        } else {
            setError('Incorrect password. Please try again.');
        }
    };

    return (
        <div className="modal" id="passwordModal">
            <div className="modal-content">
                <h2>Admin Access</h2>
                <p>Enter the admin password to edit your portfolio</p>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <input
                            type="password"
                            className="form-input"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Password"
                            autoFocus
                        />
                    </div>
                    {error && <p style={{ color: 'var(--color-error)', fontSize: '0.85rem', marginTop: '0.5rem' }}>{error}</p>}
                    <div className="modal-actions">
                        <button type="button" className="btn btn-secondary" onClick={onCancel}>Cancel</button>
                        <button type="submit" className="btn btn-primary">Enter</button>
                    </div>
                </form>
                <p style={{ marginTop: '1rem', fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>Default password: admin</p>
            </div>
        </div>
    );
};

export default AdminAuth;
