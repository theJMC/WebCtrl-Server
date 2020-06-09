var fs = require("fs");

module.exports = {
    ifttt: function ifttt(id) {
        fs.readFile(__dirname + "/../" + "devices.json", "utf-8", (err, data) => {
            devices = JSON.parse(data);
            console.log("Ifttt Called with ID " + id + " ( " + devices[id]["name"] + " )");
        }
    )}
}