import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';

function App() {
    const [count, setCount] = useState(0);

    useEffect(() => {
        console.log('App mounted, hook dispatcher is working!');
    }, []);

    return (
        <div style={{ padding: '3rem', textAlign: 'center', fontFamily: 'sans-serif' }}>
            <h1 style={{ color: '#00c3ff' }}>Functional Component Test (Alias Fixed?)</h1>
            <p style={{ fontSize: '1.2rem' }}>State: <strong>{count}</strong></p>
            <button
                onClick={() => setCount(count + 1)}
                style={{
                    padding: '0.6em 1.2em',
                    fontSize: '1em',
                    fontWeight: 500,
                    backgroundColor: '#1a1a1a',
                    color: 'white',
                    border: '1px solid transparent',
                    borderRadius: '8px',
                    cursor: 'pointer'
                }}
            >
                Increment State (Hooks)
            </button>
            <p style={{ marginTop: '2rem', color: '#888' }}>
                If you see this and can click the button, the Vite Alias fixed the Hook Dispatcher!
            </p>
        </div>
    );
}

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App />);
