const Data = require('../models/Country')
let countries

const dashboardView = async (req, res) => {
    try {        
        countries = await Data.find({})
        res.render("dashboard", {
            countries: countries
        })
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