const { Pool } = require('pg');


const PG_URI = process.env.NODE_ENV === 'test' 
? 'postgres://nwnaxssy:0nNwwEItIdpg8c1eBjzTNarTzg7Y24gU@jelani.db.elephantsql.com/nwnaxssy'
: 'postgres://kczfawhr:eZaID_V87sos32FnYX4_CNmwh8srUPKY@jelani.db.elephantsql.com/kczfawhr';


// create a new pool here using the connection string above
const pool = new Pool({
  connectionString: PG_URI
});

// // connection of database with the following schema: 
// CREATE TABLE ticket_Table (
//   _id       SERIAL PRIMARY KEY,
//   first_name     VARCHAR(50),
//   department_id  INTEGER, REFERENCES department_table(_id),
//   issue_title   VARCHAR(75),
//   issue_summary  VARCHAR(500),
//   status_id      INTEGER REFERENCES status_table(_id)
//   priority_id       INTEGER REFERENCES priority_table(_id),
//   date           TIMESTAMPTZ
// );

// CREATE TABLE department_table (
//   _id       SERIAL PRIMARY KEY,
//   name      VARCHAR(75)
// );

// CREATE TABLE priority_table (
//   _id       SERIAL PRIMARY KEY,
//   name      VARCHAR(75)
// );

// CREATE TABLE status_table (
//   _id       SERIAL PRIMARY KEY,
//   name      VARCHAR(75)
// );

// We export an object that contains a property called query,
// which is a function that returns the invocation of pool.query() after logging the query
// This will be required in the controllers to be the access point to the database

module.exports = {
  query: (text, params, callback) => {
    // console.log('executed query', text);
    return pool.query(text, params, callback);
  }
};

