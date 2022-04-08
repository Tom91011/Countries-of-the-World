const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const Data = require('./models/Data')

async function fetchCountryData() {
    let myObject = await fetch('https://restcountries.com/v3.1/all');
    let countriesData = await myObject.json();
    let data = countriesData[0].name
    const latestData = new Data ({
        data
    })
    latestData.save()
}

// const timeout = setInterval(fetchCountryData,1000000000)

fetchCountryData('https://restcountries.com/v3.1/all')

module.exports = {
    fetchCountryData
  };