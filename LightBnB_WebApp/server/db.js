const { Pool } = require('pg');

const pool = new Pool({
  user: 'vagrant',
  password: '123',
  host: 'localhost',
  database: 'lightbnb'
});

module.exports = {
  query: (text, params) => {
    return pool.query(text, params)
      .then(res => {
        const start = Date.now();
        const duration = Date.now() - start;
        console.log('executed query', { text, duration, rows: res.rowCount });
        return res;
      }).catch(err => console.error('query error', err.stack));
  },
};