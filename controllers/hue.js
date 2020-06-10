var fs = require("fs");
var axios = require("axios");
require("dotenv").config()

module.exports = {
    light: function light(id, state) {
        fs.readFile(__dirname + "/../" + "devices.json", "utf-8", (err, data) => {
            devices = JSON.parse(data);
            console.log("Hue Called with ID " + id + " ( " + devices[id]["name"] + " ) and state " + state);
            var url = "http://" + devices[id]["ctrl"]["gateway"] + "/api/" + process.env.hueKey + "/lights/" + devices[id]["ctrl"]["localID"] + "/state";
            axios({
                method: "put",
                url: url,
                data: {"on": state}
            })
            .then((response) => {
                console.log("Status Code: " + response["status"]);
            })
            .catch((error) => {
                console.error(error)
            })
        }
    )},
    room: function room(id, state) {
        fs.readFile(__dirname + "/../" + "actions.json", "utf-8", (err, data) => {
            devices = JSON.parse(data);
            console.log("Hue Room Called with ID " + id + " ( " + devices[id]["name"] + " ) and state " + state);
            var url = "http://" + devices[id]["ctrl"]["gateway"] + "/api/" + process.env.hueKey + "/groups/" + devices[id]["ctrl"]["localID"] + "/action";
            axios({
                method: "put",
                url: url,
                data: {"on": state}
            })
            .then((response) => {
                console.log("Turned Room On");
                //console.log("URL: " + url)
            })
            .catch((error) => {
                console.error(error)
            })
        })
    },
    scene: function scene(grpID, sceneID){
        fs.readFile(__dirname + "/../" + "scenes.json", "utf-8", (err, data) => {
            var scenes;
            scenes = JSON.parse(data);
            console.log(JSON.stringify(scenes))
            console.log("Hue Scene Called with Room ID " + grpID + " ( " + scenes[grpID]["name"] + " ) and sceneID " + scenes[grpID]["ctrl"]["localID"]);
            var url = "http://" + scenes[grpID]["ctrl"]["gateway"] + "/api/" + process.env.hueKey + "/groups/" + scenes[grpID]["ctrl"]["localID"] + "/action";
            axios({
                method: "put",
                url: url,
                data: {"scene": scenes[grpID]["ctrl"]["localID"]}
            })
            .then((response) => {
                //console.log("URL: " + url)
            })
            .catch((error) => {
                console.error(error)
            })
        })
    }
}