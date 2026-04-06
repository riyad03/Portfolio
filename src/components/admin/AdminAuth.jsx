import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../config/firebase';

const AdminAuth = ({ onAuthenticate, onCancel, defaultPassword }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [useFirebase, setUseFirebase] = useState(true);

    // Firebase Authentication
    const handleFirebaseAuth = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            await signInWithEmailAndPassword(auth, email, password);
            onAuthenticate();
        } catch (err) {
            console.error('Firebase auth error:', err);
            let errorMessage = 'Authentication failed. ';

            switch (err.code) {
                case 'auth/invalid-email':
                    errorMessage += 'Invalid email address.';
                    break;
                case 'auth/user-disabled':
                    errorMessage += 'This account has been disabled.';
                    break;
                case 'auth/user-not-found':
                    errorMessage += 'No account found with this email.';
                    break;
                case 'auth/wrong-password':
                    errorMessage += 'Incorrect password.';
                    break;
                case 'auth/invalid-credential':
                    errorMessage += 'Invalid credentials.';
                    break;
                default:
                    errorMessage += err.message;
            }

            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    // Simple password authentication (fallback)
    const handleSimpleAuth = (e) => {
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
                <p>Sign in to edit your portfolio</p>

                <div style={{ marginBottom: '1rem', display: 'flex', gap: '0.5rem', justifyContent: 'center' }}>
                    <button
                        type="button"
                        className={useFirebase ? 'btn btn-primary' : 'btn btn-secondary'}
                        onClick={() => setUseFirebase(true)}
                        style={{ fontSize: '0.85rem', padding: '0.5rem 1rem' }}
                    >
                        Firebase Auth
                    </button>
                    <button
                        type="button"
                        className={!useFirebase ? 'btn btn-primary' : 'btn btn-secondary'}
                        onClick={() => setUseFirebase(false)}
                        style={{ fontSize: '0.85rem', padding: '0.5rem 1rem' }}
                    >
                        Simple Password
                    </button>
                </div>

                {useFirebase ? (
                    <form onSubmit={handleFirebaseAuth}>
                        <div className="form-group">
                            <input
                                type="email"
                                className="form-input"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Email"
                                autoFocus
                                required
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="password"
                                className="form-input"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Password"
                                required
                            />
                        </div>
                        {error && <p style={{ color: 'var(--color-error)', fontSize: '0.85rem', marginTop: '0.5rem' }}>{error}</p>}
                        <div className="modal-actions">
                            <button type="button" className="btn btn-secondary" onClick={onCancel}>Cancel</button>
                            <button type="submit" className="btn btn-primary" disabled={loading}>
                                {loading ? 'Signing in...' : 'Sign In'}
                            </button>
                        </div>
                    </form>
                ) : (
                    <form onSubmit={handleSimpleAuth}>
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
                        <p style={{ marginTop: '1rem', fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>
                            Default password: admin
                        </p>
                    </form>
                )}
            </div>
        </div>
    );
};

export default AdminAuth;
