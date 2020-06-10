var wol = require("wol");
require("dotenv").config()

module.exports = {
    Wake: function wake() {
        console.log("Sent WoL Packet to James-PC")
        wol.wake(process.env.PC_MAC_ADDR, (err, res) => {
            console.log(res)
        });
        console.log("Sent WoL to " + process.env.PC_MAC_ADDR)
    }
}