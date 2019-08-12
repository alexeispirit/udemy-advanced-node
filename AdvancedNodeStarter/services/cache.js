const mongoose = require('mongoose');
const redis = require('redis');
const promisify = require('util').promisify;

const redisUrl = 'redis://127.0.0.1:6379';
const client = redis.createClient(redisUrl);
client.get = promisify(client.get);

const exec = mongoose.Query.prototype.exec;

mongoose.Query.prototype.exec = function() {
  console.log('IM ABOUT TO RUN A QUERY');

  const key = JSON.stringify(
    Object.assign({}, this.getQuery(), {
      collection: this.mongooseCollection.name
    })
  );

  return exec.apply(this, arguments);
};
