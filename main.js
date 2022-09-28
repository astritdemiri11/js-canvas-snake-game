import express from 'express';
import { join } from 'path';

export function app() {
  const server = express();
  const distFolder = join(process.cwd(), 'browser');

  server.set('views', distFolder);

  server.get('*.*', express.static(distFolder, {
    maxAge: '1y'
  }));

  server.get('*', (_req, res) => {
    res.sendFile(distFolder + '/index.html');
  });

  return server;
}

const port = process.env['PORT'] || 4000;

// Start up the Node server
const server = app();
server.listen(port, () => {
  console.log(`Node Express server listening on http://localhost:${port}`);
});
