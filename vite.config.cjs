require('dotenv').config({ path: '.env.local' })

const react = require('@vitejs/plugin-react')
const path = require('path')
const { defineConfig } = require('vite')

module.exports = defineConfig({
    plugins: [
        react(),
        {
            name: 'api-middleware',
            configureServer(server) {
                server.middlewares.use(async (req, res, next) => {
                    if (req.url === '/api/chat' && req.method === 'POST') {
                        let body = '';
                        req.on('data', chunk => { body += chunk.toString(); });
                        req.on('end', async () => {
                            try {
                                req.body = JSON.parse(body);
                                const mockRes = {
                                    status: (code) => ({
                                        json: (data) => {
                                            res.statusCode = code;
                                            res.setHeader('Content-Type', 'application/json');
                                            res.end(JSON.stringify(data));
                                        }
                                    }),
                                    setHeader: (name, value) => res.setHeader(name, value)
                                };
                                // Dynamically import the ES module
                                const chatModule = await import('./api/chat.js');
                                const chatHandler = chatModule.default;
                                await chatHandler(req, mockRes);
                            } catch (err) {
                                console.error('API Middleware Error:', err);
                                res.statusCode = 500;
                                res.end(JSON.stringify({ error: 'Internal Server Error' }));
                            }
                        });
                    } else {
                        next();
                    }
                });
            }
        }
    ],
    resolve: {
        alias: {
            'react': path.resolve(__dirname, './node_modules/react'),
            'react-dom': path.resolve(__dirname, './node_modules/react-dom'),
        }
    },
    build: {
        rollupOptions: {
            output: {
                entryFileNames: 'assets/[name].[hash].js',
                chunkFileNames: 'assets/[name].[hash].js',
                assetFileNames: 'assets/[name].[hash].[ext]'
            }
        }
    },
    server: {
        headers: {
            'Cache-Control': 'no-cache, no-store, must-revalidate'
        }
    }
})
