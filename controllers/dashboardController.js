const Data = require('../models/Country')
let data

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

module.exports = {
    dashboardView
}