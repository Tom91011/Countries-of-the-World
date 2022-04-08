const Data = require('../models/Data')
let data

const dashboardView = async (req, res) => {
    try {        
        data = await Data.find({})
        console.log(data);
        res.render("dashboard", {
            country: data
        })
    } catch (err) {
        console.log(err);
      }  
}

module.exports = {
    dashboardView
}