const { Pool } = require('pg');

// Pool for the first database
const poolDb1 = new Pool({
    user:'postgres',
    host:'localhost',
    database:'digimenu',
    password:'ajay@9825',
    port:5432
});

// Pool for the second database
const poolDb2 = new Pool({
    user:'postgres',
    host:'localhost',
    database:'zerotohero',
    password:'ajay@9825',
    port:5432
});

// Function to query the first database
const queryDb1 = (text, params) => {
  return poolDb1.query(text, params);
};

// Function to query the second database
const queryDb2 = (text, params) => {
  return poolDb2.query(text, params);
};

// Export both query functions
module.exports = {
  queryDb1,
  queryDb2
};

