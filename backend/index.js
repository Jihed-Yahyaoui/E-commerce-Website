const express = require("express")
const app = express()
const cors = require("cors")
const sendProduct = require("./controllers/sendProduct.js")
const sendKeys = require("./controllers/sendKeys.js")
const mongoose = require('mongoose');
mongoose.set("strictQuery", true)
mongoose.connect('mongodb://127.0.0.1:27017/config')

app.use(cors()) 
app.use(express.json()) 

app.get("/:product", sendKeys)
app.post("/:product", sendProduct)

app.listen(5000, () => console.log("listening..."))