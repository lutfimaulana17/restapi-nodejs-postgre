const Pool = require('pg').Pool
const dbConfig = require("../config/db.config.js")

//create a conection to the database
const connection = new Pool({
    user: dbConfig.USER,
    host: dbConfig.HOST,
    database: dbConfig.DB,
    password: dbConfig.PASSWORD,
    port: dbConfig.PORT,
})

//open the postgree connection
connection.connect(error => {
    if (error) throw error;
    console.log("Successfully connected to the database")
})

module.exports = connection