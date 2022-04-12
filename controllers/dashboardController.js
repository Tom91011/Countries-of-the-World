const Data = require('../models/Country')
let countries

const dashboardView = async (req, res) => {
    try {        
        data = await Data.find({})
        console.log(data.length);
        res.render("dashboard", {
            countries: data
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