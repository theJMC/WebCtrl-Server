var express = require("express"); var app = express();
var fs = require("fs");
var cors = require("cors");
var bodyParser = require('body-parser');
var hue = require("./controllers/hue"); 
var ifttt = require("./controllers/ifttt"); 
var WoL = require("./controllers/wol"); 
var axios = require("axios");
require("dotenv").config()

// To Use .env, preface the variable name with process.env.
app.use(bodyParser.json({ type: 'application/json' }));
app.use(cors());


app.get("/api", cors(), (req, res, next) => {
    fs.readFile(__dirname + "/" + "configs/devices.json", "utf-8", (err, data) => {
        let obj = JSON.parse(data);
        res.json(obj);
    })
})

app.get("/quick", cors(), (req, res, next) => {
    fs.readFile(__dirname + "/" + "configs/actions.json", "utf-8", (err, data) => {
        let obj = JSON.parse(data);
        res.json(obj);
    })
})

app.get("/scenes", cors(), (req, res, next) => {
    fs.readFile(__dirname + "/" + "configs/scenes.json", "utf-8", (err, data) => {
        let obj = JSON.parse(data);
        res.json(obj);
    })
})

// ||======== DEVICES CONTROLLER ========||
var devices;

app.post("/device", cors(), (req, res, next) => {
    var body = req.body;
    fs.readFile(__dirname + "/" + "configs/devices.json", "utf-8", (err, data) => {
        devices = JSON.parse(data);
        ctrl_type = devices[body["id"]]["ctrl"]["brand"]
        if (ctrl_type == "hue"){
            hue.light(body["id"], body["state"]);
            res.status(200).json({"message": "Recived Command Successfully, setting " + devices[body["id"]]["name"] + " to state " + body["state"], "recieved": body})
        } else if (ctrl_type == "ifttt") {
            ifttt.ifttt(body["id"]);
            res.status(200).json({"message": "Recived Command Successfully, triggering " + devices[body["id"]]["name"], "recieved": body})
        } else {
            res.status(400).json({"message": "Malformed Request - ID Lookup failed", "recieved": body})
        }
    })
})

// ||======== QUICK ACTIONS CONTROLLER ========||
var actions;

app.post("/action", cors(), (req, res, next) => {
    var body = req.body;
    fs.readFile(__dirname + "/" + "configs/devices.json", "utf-8", (err, data) => {
        actions = JSON.parse(data);
        ctrl_type = actions[body["id"]]["ctrl"]["brand"]
        if (ctrl_type == "hue"){
            hue.room(body["id"], body["state"]);
            res.status(200).json({"message": "Recived Command Successfully, setting " + actions[body["id"]]["name"] + " to state " + body["state"], "recieved": body})
        } else if (ctrl_type == "ifttt") {
            ifttt.ifttt(body["id"]);
            res.status(200).json({"message": "Recived Command Successfully, triggering " + actions[body["id"]]["name"], "recieved": body})
        } else {
            res.status(400).json({"message": "Malformed Request - ID Lookup failed", "recieved": body})
        }
    })
})

// ||======== PC WoL CONTROLLER ========||

app.get("/wol", cors(), (req, res, next) => {
    WoL.Wake()
    res.status(200).json({"message": "Triggered WoL"})
})

// ||======== ROOM SCENES CONTROLLER ========||

var scenes;

app.post("/scene", cors(), (req, res, next) => {
    var body = req.body;
    fs.readFile(__dirname + "/" + "configs/scenes.json", "utf-8", (err, data) => {
        scenes = JSON.parse(data);
        ctrl_type = scenes[body["id"]]["ctrl"]["brand"]
        if (ctrl_type == "hue"){
            hue.scene(body["id"], body["sceneID"]);
            res.json({"message": "Recived Command Successfully, setting " + scenes[body["id"]]["name"] + " to state " + body["sceneID"], "recieved": body})
            res.status(200)
        } else if (ctrl_type == "ifttt") {
            ifttt.ifttt(body["id"]);
            res.status(200).json({"message": "Recived Command Successfully, triggering " + scenes[body["id"]]["name"], "recieved": body})
        } else {
            res.status(400).json({"message": "Malformed Request - ID Lookup failed", "recieved": body})
        }
    })
})



app.listen(420, () => {
    console.log("Server running on port 420");
});

