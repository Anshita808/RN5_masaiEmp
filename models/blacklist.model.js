const mongoose = require("mongoose")

const blackSchema = mongoose.Schema({
    token:{type:String}
})

const BlackModel = mongoose.model("blacklist",blackSchema)

module.exports = {BlackModel}