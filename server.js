import { createServer } from 'vite';

    async function startServer() {
      const server = await createServer({
        server: {
          middlewareMode: true,
          hmr: {
            port: 24678,
          },
        },
        appType: 'custom',
      });

      server.middlewares.use((req, res, next) => {
        if (req.url.startsWith('/api')) {
          // Placeholder for API responses
          res.setHeader('Content-Type', 'application/json');
          if (req.url === '/api/books') {
            res.end(JSON.stringify({ message: 'GET /books' }));
          } else if (req.url.startsWith('/api/books/')) {
            res.end(JSON.stringify({ message: `GET ${req.url}` }));
          } else {
            res.statusCode = 404;
            res.end(JSON.stringify({ error: 'Not found' }));
          }
        } else {
          next();
        }
      });

      await server.listen();

      server.printUrls();
    }

    startServer();
