const express = require("express");
const { connection } = require("./db");
const { UserRouter } = require("./routes/user.routes");
const { employeeRouter } = require("./routes/emp.routes");
const cors = require("cors");
require("dotenv").config();
const app = express();

app.use(express.json());
app.use(cors());
app.use("/user",UserRouter);
app.use("/employ",employeeRouter);


app.listen(process.env.PORT, async()=>{
    try {
        await connection
        console.log("database is connected");
    } catch (error) {
        console.log(error);
    }
    console.log("server is running");
})