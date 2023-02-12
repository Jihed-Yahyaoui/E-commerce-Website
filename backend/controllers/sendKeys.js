const laptopSchema = require("../models/laptopSchema")
const smartphoneSchema = require("../models/phoneSchema")

async function retrieveKeys(res, schema) {
    let k = []
    let keys = {}

    k = await schema.findOne({}).then(result => Object.keys(result._doc).slice(2))
    k.forEach(x => keys[x] = [])
    for (const prop of k) 
        if (prop === 'price') {
            keys.price[0] = await schema.find().sort('price').limit(1).then(x => x[0].price)
            keys.price[1] = await schema.find().sort('-price').limit(1).then(x => x[0].price)
        }
        else {
            keys[prop] = await schema.find().distinct(`${prop}`)
            keys[prop].sort((a, b) => Number(a.split(' ')[0]) - Number(b.split(' ')[0]))
        }

    res.json(keys)
}

function sendKeys(req, res) {
    const { product } = req.params
    switch (product) {
    case "laptops": retrieveKeys(res, laptopSchema)
                    break;
    case "phones": retrieveKeys(res, smartphoneSchema)
                       break;
    default: res.status(404).json({});
    }
}

module.exports = sendKeys