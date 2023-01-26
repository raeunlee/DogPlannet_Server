const mysql = require('mysql');
//const {logger} = require('./winston');

//mysql 임시,,
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    port: '3306',
    password: '',
    database: 'spring_crud'
});

module.exports = {
    pool: pool
};