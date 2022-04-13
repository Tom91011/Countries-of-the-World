const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const Country = require('./models/Country')

async function fetchCountryData() {
    let myObject = await fetch('https://restcountries.com/v3.1/all');
    let countriesData = await myObject.json();
    let i = 0
    while (i < countriesData.length ) {
        let country = countriesData[i]
        const newCountry = new Country ({
            country
        })

        // to do: make this run once per day
        // await newCountry.save()
        i++
    }
}

// const timeout = setInterval(fetchCountryData,1000000000)

fetchCountryData('https://restcountries.com/v3.1/all')

module.exports = {
    fetchCountryData
  };