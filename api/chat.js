export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { messages, portfolioData } = req.body;
    const apiKey = process.env.OPENAI_API_KEY;

    if (!apiKey) {
        return res.status(500).json({ error: 'OpenAI API Key not configured on server' });
    }

    // Summarize portfolio for context injection
    const context = `
    You are a professional recruitment assistant for ${portfolioData.hero.name}.
    ${portfolioData.hero.name} is a ${portfolioData.hero.title}.
    Skills: ${portfolioData.skills.map(s => s.name).join(', ')}.
    Projects: ${portfolioData.projects.map(p => `${p.title}: ${p.description}`).join('; ')}.
    
    Answer questions concisely and professionally based on this context. 
    If a project detail matches the user's inquiry, highlight why ${portfolioData.hero.name} is a good fit.
  `;

    try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                model: 'gpt-4o-mini',
                messages: [
                    { role: 'system', content: context },
                    ...messages.map(m => ({
                        role: m.type === 'bot' ? 'assistant' : 'user',
                        content: m.text
                    }))
                ],
                temperature: 0.7,
                max_tokens: 500
            })
        });

        const data = await response.json();

        if (data.error) {
            console.error('OpenAI Error:', data.error);
            return res.status(500).json({ error: 'AI processing failed' });
        }

        const botMessage = data.choices[0].message.content;
        return res.status(200).json({ text: botMessage });
    } catch (err) {
        console.error('Fetch Error:', err);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}
