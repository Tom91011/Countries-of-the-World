const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

async function fetchCountryData() {
    let myObject = await fetch('https://restcountries.com/v3.1/all');
    let countriesData = await myObject.json();
    console.log(countriesData[0].name);
}

// const timeout = setInterval(fetchCountryData,1000000000)

fetchCountryData('https://restcountries.com/v3.1/all')

module.exports = {
    fetchCountryData
  };