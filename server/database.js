const { Pool } = require("pg");

var dbcon = process.env.DATABASE_URL || 'postgresql:postgres:vasco21@127.0.0.1:5432/greetings'
const pool = new Pool({
        connectionString: dbcon,
        ssl:{
          rejectUnauthorized: false,
    },
});

module.exports = pool;