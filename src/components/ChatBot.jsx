import React, { useState, useEffect, useRef } from 'react';

const ChatBot = ({ portfolioData, isOpen, onToggle }) => {
    const [isTyping, setIsTyping] = useState(false);
    const [messages, setMessages] = useState([
        { type: 'bot', text: "Hi! I'm your AI recruitment assistant. I've studied your portfolio—ask me anything about your skills or projects!" }
    ]);
    const [input, setInput] = useState('');
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isTyping]);

    const handleSend = async (text = input) => {
        if (!text.trim() || isTyping) return;

        const newMessages = [...messages, { type: 'user', text }];
        setMessages(newMessages);
        setInput('');
        setIsTyping(true);

        try {
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    messages: newMessages,
                    portfolioData
                })
            });

            const data = await response.json();

            if (data.error) {
                throw new Error(data.error);
            }

            setMessages(prev => [...prev, { type: 'bot', text: data.text }]);
        } catch (err) {
            console.error('Chat Error:', err);
            setMessages(prev => [...prev, {
                type: 'bot',
                text: "I'm having trouble connecting to my AI brain. Please ensure your OpenAI API Key is configured in Vercel!"
            }]);
        } finally {
            setIsTyping(false);
        }
    };

    const quickActions = [
        "What are your top skills?",
        "Do you have React experience?",
        "Tell me about your IoT projects",
        "Are you available for hire?"
    ];

    return (
        <div className="chatbot-container">
            {isOpen && (
                <div className="chatbot-window">
                    <div className="chatbot-header">
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                            <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--color-accent-primary)' }}></div>
                            <h3>AI Assistant</h3>
                        </div>
                        <button onClick={onToggle} style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer', fontSize: '1.2rem' }}>×</button>
                    </div>
                    <div className="chatbot-messages">
                        {messages.map((m, i) => (
                            <div key={i} className={`chat-msg ${m.type}`}>
                                {m.text}
                            </div>
                        ))}
                        {isTyping && (
                            <div className="chat-msg bot" style={{ opacity: 0.7, fontStyle: 'italic', display: 'flex', gap: '0.4rem', borderBottomLeftRadius: '0.2rem' }}>
                                <span>●</span><span>●</span><span>●</span>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {!isTyping && messages.length < 3 && (
                        <div style={{ padding: '0 1rem 0.5rem', display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                            {quickActions.map((action, i) => (
                                <button
                                    key={i}
                                    onClick={() => handleSend(action)}
                                    style={{ fontSize: '0.75rem', padding: '0.3rem 0.7rem', borderRadius: '1rem', border: '1px solid var(--glass-border)', background: 'var(--color-bg-tertiary)', color: 'rgba(255,255,255,0.7)', cursor: 'pointer' }}
                                >
                                    {action}
                                </button>
                            ))}
                        </div>
                    )}

                    <form className="chatbot-input-area" onSubmit={(e) => { e.preventDefault(); handleSend(); }}>
                        <input
                            type="text"
                            className="chatbot-input"
                            placeholder={isTyping ? "AI is thinking..." : "Ask me anything..."}
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            disabled={isTyping}
                        />
                        <button type="submit" className="chatbot-send" disabled={isTyping || !input.trim()}>
                            <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" /></svg>
                        </button>
                    </form>
                </div>
            )}

            <div className="chatbot-bubble" onClick={onToggle}>
                {isOpen ? (
                    <svg viewBox="0 0 24 24" width="30" height="30" fill="#fff"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" /></svg>
                ) : (
                    <div style={{ position: 'relative' }}>
                        <svg viewBox="0 0 24 24" width="30" height="30" fill="#fff"><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z" /></svg>
                        <div style={{ position: 'absolute', top: '-5px', right: '-5px', width: '12px', height: '12px', background: 'var(--color-accent-primary)', borderRadius: '50%', border: '2px solid var(--color-bg-primary)' }}></div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ChatBot;
