const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const Country = require('./models/Country')

async function fetchCountryData() {
    let myObject = await fetch('https://restcountries.com/v3.1/all');
    let countriesData = await myObject.json();
    // console.log(countriesData);
    let i = 0
    // while (i < countriesData.length ) {
    //     let country = countriesData[i].name
    //     const newCountry = new Country ({
    //         country
    //     })
    //     newCountry.save()
    //     i++
    // }

    
}

// const timeout = setInterval(fetchCountryData,1000000000)

fetchCountryData('https://restcountries.com/v3.1/all')

module.exports = {
    fetchCountryData
  };

//   <h2 class="country__name"><%= countries[0].country.common %></h2>