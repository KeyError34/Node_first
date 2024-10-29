

const fs = require('fs').promises; // промисы для работы с fs
const { logMessage, clearLog } = require('./logger');
const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;
const logFile = './log.txt';

// '' лог перед добавлением сообщений
(async () => {
  await clearLog(); // очищаем лог
  await logMessage('First message');
  await logMessage('Second message');
  await logMessage('Third message');

  const server = http.createServer(async (req, res) => {
    try {
      const data = await fs.readFile(logFile, 'utf-8');
      const dataLogs = JSON.parse(data); //  содержимое файла как JSON

      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({ data: dataLogs }));
    } catch (err) {
      console.error('Error occurred when reading file:', err);
      res.statusCode = 500;
      res.end(JSON.stringify({ error: 'Failed to read log file' }));
    }
  });

  server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
  });
})();