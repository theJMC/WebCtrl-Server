var fs = require("fs");
var axios = require("axios");
require("dotenv").config()

module.exports = {
    ifttt: function ifttt(id) {
        fs.readFile(__dirname + "/../" + "devices.json", "utf-8", (err, data) => {
            devices = JSON.parse(data);
            console.log("Ifttt Called with ID " + id + " ( " + devices[id]["name"] + " )");
            var url = devices[id]["ctrl"]["gateway"].replace("{0}", devices[id]["ctrl"]["localID"]).replace("{1}", process.env.iftttKey);
            axios({
                method: "get",
                url: url,
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