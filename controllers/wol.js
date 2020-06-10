var wol = require("node-wol");
require("dotenv").config()

module.exports = {
    Wake: function wake() {
        console.log("Sent WoL Packet to James-PC")
        wol.wake(process.env.PC_MAC_ADDR);
        console.log("Sent WoL to " + process.env.PC_MAC_ADDR)
    }
}