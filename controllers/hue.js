var fs = require("fs");

module.exports = {
    hue: function hue(id, state) {
        fs.readFile(__dirname + "/../" + "devices.json", "utf-8", (err, data) => {
            devices = JSON.parse(data);
            console.log("Hue Called with ID " + id + " ( " + devices[id]["name"] + " ) and state " + state);
        }
    )}
}