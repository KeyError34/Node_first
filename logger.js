const fs = require('fs');
const log= './log.txt'
function logMessage(message) {
  const timestamp = new Date().toISOString();
  fs.appendFile(log, `${timestamp} - ${message}\n`, (err) => {
    if (err) {
      throw err;
    }
  })
}
function clearLog() {
  fs.writeFile(log, '', (err) => {
    if (err) {
      throw err;
    }
  })
}
module.exports={logMessage, clearLog}