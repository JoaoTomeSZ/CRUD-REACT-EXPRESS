const express = require("express")
const usersRoute = require("./routes/users")
const dotenv = require("dotenv").config()
const cors = require("cors")

const app = express();

const port = process.env.SERVER_PORT
app.use(express.json())
app.use(cors())

app.use('/usuarios', usersRoute)

app.listen(port, () => {
    console.log(`Server is now running on port:  ${port}`)
})