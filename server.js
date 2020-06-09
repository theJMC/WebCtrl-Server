var express = require("express"); var app = express();
var fs = require("fs");
var cors = require("cors");
var bodyParser = require('body-parser');
var hue = require("./controllers/hue"); 
var ifttt = require("./controllers/ifttt"); 
require("dotenv").config()

// To Use .env, preface the variable name with process.env.
app.use(bodyParser.json({ type: 'application/json' }));
app.use(cors());


app.get("/api", cors(), (req, res, next) => {
    fs.readFile(__dirname + "/" + "devices.json", "utf-8", (err, data) => {
        let obj = JSON.parse(data);
        res.json(obj);
    })
})

//function control(id, )

var devices;

app.post("/device", cors(), (req, res, next) => {
    var body = req.body;
    fs.readFile(__dirname + "/" + "devices.json", "utf-8", (err, data) => {
        devices = JSON.parse(data);
        ctrl_type = devices[body["id"]]["ctrl"]["brand"]
        if (ctrl_type == "hue"){
            hue.hue(body["id"], body["state"]);
            res.status(200).json({"message": "Recived Command Successfully, setting " + devices[body["id"]]["name"] + " to state " + body["state"], "recieved": body})
        } else if (ctrl_type == "ifttt") {
            ifttt.ifttt(body["id"]);
            res.status(200).json({"message": "Recived Command Successfully, triggering " + devices[body["id"]]["name"], "recieved": body})
        } else {
            res.status(400).json({"message": "Malformed Request - ID Lookup failed", "recieved": body})
        }
    })
})

app.listen(1337, () => {
    console.log("Server running on port 1337");
});