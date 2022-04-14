const Data = require('../models/Country')
let countries

const dashboardView = async (req, res) => {
    try {        
        countries = await Data.find({})
        res.render("dashboard")
    } catch (err) {
        console.log(err);
      }  
}

const sendCountries = async () => {
    countries = await Data.aggregate([{$sort : {country: 1}}])
    console.log("in dashboard sendCountries function");
    console.log(countries[0]);
    return (countries)
}

module.exports = {
    dashboardView,
    sendCountries
}