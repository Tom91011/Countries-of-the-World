const Data = require('../models/Country')
let countries

const dashboardView = async (req, res) => {
    try {        
        countries = await Data.find({})
        console.log(countries.length);
        res.render("dashboard", {
            countries: countries
        })
    } catch (err) {
        console.log(err);
      }  
}

const sendCountries = () => {
    return (countries)
}

module.exports = {
    dashboardView,
    sendCountries
}