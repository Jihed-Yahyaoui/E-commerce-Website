const mongoose = require("mongoose")

const smartphone = mongoose.Schema({
    name: String,
    price: Number,
    brand: String
})

module.exports = mongoose.model("smartphones", smartphone)

