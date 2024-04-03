const {Client,Pool} = require('pg')


const clinet = new Client({
    host: "localhost",
    user: "postgres",
    password: "postgres",
    port: 5432,
    database: "BornToDevDB"
})
const pool = new Pool({
    host: "localhost",
    user: "postgres",
    password: "postgres",
    port: 5432,
    database: "BornToDevDB"
})

module.exports = pool