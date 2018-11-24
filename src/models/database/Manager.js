var sqlite3 = require('sqlite3');
var Promise = require('bluebird');

//documentation: http://www.sqlitetutorial.net/sqlite-nodejs/query/
//https://stackabuse.com/a-sqlite-tutorial-with-node-js/

class DatabaseManager{
    constructor(dbFilePath) {
        this.db = new sqlite3.Database(dbFilePath, (err) => {
          if (err) {
            console.log('Could not connect to database', err)
          } else {
            console.log('Connected to database')
          }
        })
      }
   get(sql, params = []) {
    return new Promise((resolve, reject) => {
      this.db.get(sql, params, (err, result) => {
        if (err) {
          console.log('Error running sql: ' + sql)
          console.log(err)
          reject(err)
        } else {
          resolve(result)
        }
      })
    })
  }

  all(sql, params = []) {
    return new Promise((resolve, reject) => {
      this.db.all(sql, params, (err, rows) => {
        if (err) {
          console.log('Error running sql: ' + sql)
          console.log(err)
          reject(err)
        } else {
          resolve(rows)
        }
      })
    })
  }
}
module.exports = DatabaseManager;