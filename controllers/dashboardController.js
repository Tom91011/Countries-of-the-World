const Data = require('../models/Country')
let countries

const dashboardView = async (req, res) => {
    try {        
        constcountriess = await Data.find({})
        res.render("dashboard")
    } catch (err) {
        console.log(err);
      }  
}

const sendCountries = async () => {
    countries = await Data.aggregate([{$sort : {country: 1}}])
    return (countries)
}

module.exports = {
    dashboardView,
    sendCountries
}