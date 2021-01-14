// mysql/index.js

var mysql = require('mysql');
var config = require('../config/default.js')

var pool = mysql.createPool({
    host: config.database.HOST,
    user: config.database.USERNAME,
    password: config.database.PASSWORD,
    database: config.database.DATABASE
});


class Mysql {
    constructor() { }
    query(sql) {
        return new Promise((resolve, reject) => {
            pool.query(sql, function (error, results) {
                if (error) throw error
                resolve(results)
            });
        })
    }
}

module.exports = new Mysql()
