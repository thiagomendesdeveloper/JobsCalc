const sqLite3 = require('sqlite3')
const { open } = require('sqlite')

module.exports = () =>  open({
    filename: './database.sqlite',
    driver: sqLite3.Database
});