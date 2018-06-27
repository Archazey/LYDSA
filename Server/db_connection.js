var pg = require('pg');
var pool;
var config = {
    user: 'lydsa',
    host: 'localhost',
    database: 'lydsa-db',
    password: 'donkretska', 
    max: 10,
    idleTimeoutMillis: 30000,
};

module.exports = {
    getPool: function () {
      if (pool) return pool; // if it is already there, grab it here
      pool = new pg.Pool(config);
      return pool;
    }
};