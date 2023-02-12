const mongoose = require("mongoose")

const laptop = mongoose.Schema({
    name: String,
    price: Number,
    brand: String
})
    
module.exports = mongoose.model("laptops", laptop)

