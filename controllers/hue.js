var fs = require("fs");
var axios = require("axios");
require("dotenv").config()

module.exports = {
    hue: function hue(id, state) {
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
    )}
}