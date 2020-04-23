const express = require("express")
const bodyParser = require("body-parser")

const app = express()

//parse requests of content-type: application/json
app.use(bodyParser.json())

//parse request of content-type: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

//simple route
app.get("/", (req, res) => {
    res.json({ message: "Hi this backend using node js"})
})

//route
require("./app/routes/customer.routes.js")(app)

//setting port
app.listen(3000, () => {
    console.log("Server is running on port 3000")
})