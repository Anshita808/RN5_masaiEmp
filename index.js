const express = require("express");
const { connection } = require("./db");
const { userRoute } = require("./routes/user.routes");
const { empRoute } = require("./routes/emp.routes");
const cors = require("cors")
require("dotenv").config()
const app = express();

app.use(express.json());
app.use(cors())
app.use("/user",userRoute)
app.use("/employ",empRoute)

app.listen(process.env.PORT,async()=>{
    try {
        await connection
        console.log("db is connected")
    } catch (error) {
        
    }
    console.log("server is running")
})