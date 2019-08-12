process.env.UV_THREADPOOL_SIZE = 1;

const cluster = require('cluster');

// is the file being executed in master mode?
if (cluster.isMaster) {
  // cause index.js to be executed *again* but in child mode
  cluster.fork();
} else {
  //  child instance. act like a server and do nothing else
  const express = require('express');
  const crypto = require('crypto');
  const app = express();

  function doWork(duration) {
    const start = Date.now();
    while (Date.now() - start < duration) {}
  }

  app.get('/', (req, res) => {
    crypto.pbkdf2('a', 'b', 100000, 512, 'sha512', () => {
      res.send('Hi there');
    });
  });

  app.get('/fast', (req, res) => {
    res.send('This was fast');
  });

  app.listen(3000);
}
