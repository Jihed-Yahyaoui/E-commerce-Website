const laptopSchema = require("../models/laptopSchema")
const smartphoneSchema = require("../models/phoneSchema")
require("dotenv")

async function retrieveData(schema, req, res) {
    const { pageNumber, numberOfItems, filters } = req.body
    let cons = {}

    for (const prop in filters)
        if (prop === "price")
            cons.price = { $gte: filters.price[0], $lte: filters.price[1] }
        else if (filters[prop].length > 0)
            cons[prop] = { $in: filters[prop] }

    await schema
          .find(cons)
          .skip(numberOfItems * (pageNumber - 1))
          .limit(numberOfItems)
          .then(result => res.json(result))
}

function sendProduct(req, res) {
    const { product } = req.params
    switch (product) {
        case "laptops": retrieveData(laptopSchema, req, res)
            break;
        case "phones": retrieveData(smartphoneSchema, req, res)
            break;
        default: res.status(404).json({});
    }
}

module.exports = sendProduct
