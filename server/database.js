const { Pool } = require("pg");

var dbcon = process.env.DATABASE_URL || 'postgresql:greetings:vasco21@localhost:5432/greetings'
const pool = new Pool({
        connectionString: dbcon,
        ssl:{
          rejectUnauthorized: false,
    },
});

module.exports = pool;