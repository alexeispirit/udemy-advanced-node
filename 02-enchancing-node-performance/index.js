const express = require('express');
const crypto = require('crypto');
const Worker = require('webworker-threads').Worker;

const app = express();

function doWork(duration) {
  const start = Date.now();
  while (Date.now() - start < duration) {}
}

app.get('/', (req, res) => {
  const worker = new Worker(function() {
    this.onmessage = function() {
      let counter = 0;
      while (conter < 1e9) {
        counter++;
      }

      postMessage(counter);
    };
  });

  worker.onmessage = function(myCounter) {
    console.log(myCounter);
    res.send('' + message.data);
  };

  worker.postMessage();
});

app.get('/fast', (req, res) => {
  res.send('This was fast');
});

app.listen(3000);
