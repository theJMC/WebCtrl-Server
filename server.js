var express = require("express"); var app = express()
var fs = require("fs")
var cors = require("cors")
require("dotenv").config()

// To Use .env, preface the variable name with process.env.

app.get("/api", cors(), (req, res, next) => {
    fs.readFile(__dirname + "/" + "devices.json", "utf-8", (err, data) => {
        let obj = JSON.parse(data);
        res.json(obj);
    })
})


app.listen(1337, () => {
    console.log("Server running on port 1337");
});