const fs = require('fs').promises;
const log = './log.txt';
// function logMessage(message) {
//   const timestamp = new Date().toISOString();
//   fs.appendFile(log, `${timestamp} - ${message}\n`, (err) => {
//     if (err) {
//       throw err;
//     }
//   });
// }
async function logMessage(message) {
  const timestamp = new Date().toISOString();
  let logs = [];

  try {
    // чтение существующих логов
    const data = await fs.readFile(log, 'utf-8');
    if (data) {
      logs = JSON.parse(data); // пробуем прочитать текущие логи как массив
    }
  } catch (err) {
    if (err.code === 'ENOENT') {
      // если файл не существует, создаем его с пустым массивом
      logs = [];
      await fs.writeFile(log, JSON.stringify(logs, null, 2));
    } else {
      console.error('Failed to read log file:', err);
    }
  }

  // добавляем новый лог
  logs.push({ timestamp, message });

  // записываем обновленный массив обратно в файл
  try {
    await fs.writeFile(log, JSON.stringify(logs, null, 2));
  } catch (writeErr) {
    console.error('Failed to write log file:', writeErr);
    throw writeErr;
  }
}

async function clearLog() {
  // очищаем файл и записываем пустой массив, чтобы JSON оставался корректным
  try {
    await fs.writeFile(log, '[]');
  } catch (err) {
    console.error('Failed to clear log file:', err);
    throw err;
  }
}

module.exports = { logMessage, clearLog };
