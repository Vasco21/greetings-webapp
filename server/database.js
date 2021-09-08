const Pool= require("pg").Pool;
var connection = {
  user : "postgres",
  host : "localhost",
  database : "greetings",
  password : "vasco21",
  port : 5432,
}
var dbcon = process.env.DATABASE_URL || connection
const pool = new Pool({
        dbcon,
        ssl:{
          rejectUnauthorized: false
        }
});


// Connect with a connection pool.

// async function poolDemo() {
//     const pool = new Pool(credentials);
//     const now = await pool.query("SELECT NOW()");
//     await pool.end();
  
//     return now;
//   }



// Use a self-calling function so we can use async / await.

// (async () => {
//     const poolResult = await poolDemo();
//     console.log("Time with pool: " + poolResult.rows[0]["now"]);
//   })();

  module.exports = pool;