'user strict';

import mysql = require('mysql');

// connection to heroku mysql db
let pool: mysql = mysql.createPool({
    connectionLimit: 10,
    host: 'us-cdbr-iron-east-03.cleardb.net',
    user: 'b756c5a53c8888',
    password: 'e12cc1cb',
    database: 'heroku_75d49d35a82afaa'
});

export = pool;