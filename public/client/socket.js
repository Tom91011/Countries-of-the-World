const socket = io();
const filterInput = document.querySelector(".filter-row__input")
let countriesData = []
const countryNameArray = []
const countriesToShowPerLoad = 6
let lastCountryDisplayed = countriesToShowPerLoad - 1

const countryTemplate = document.querySelector(".country-template")
const countriesContainer = document.querySelector(".countries")

const unhideElement = (element, cssClass) => element.classList.remove(cssClass)
const addTextContent = (element, text) => element.textContent = text

socket.on('sendCountriesData', (countriesDataFromDb) => {
    countriesData = countriesDataFromDb
    console.log(countriesData)

    for(let i = 0; i < countriesToShowPerLoad; i++) {
        cloneNode(countryTemplate, countriesContainer, countriesDataFromDb[i])
    }

    countriesData.forEach(country => {
        countryNameArray.push(country.country.name.common.toLowerCase())
    })
    console.log(countryNameArray);
})
// Stops the scroll repeating multiple times
let throttleTimer;

const handleScrollThrottle = () => {
  const scrollBuffer = 400
  
  if(window.innerHeight + window.scrollY >= document.body.scrollHeight - scrollBuffer){
     
        for(let i = 0; i < countriesToShowPerLoad; i++) {
            if(lastCountryDisplayed != countriesData.length - 1) {
            cloneNode(countryTemplate, countriesContainer, countriesData[lastCountryDisplayed + 1])
            console.log("cloned new country");
            lastCountryDisplayed += 1
            } else {
                console.log("Thats all the countries");
                i = countriesToShowPerLoad 
            }
        }
  } 
}

const throttle = (handleScrollThrottle, time) => {
    
  if (throttleTimer) return;
    throttleTimer = true;
    setTimeout(() => {
        handleScrollThrottle();
        throttleTimer = false;
    }, time);
}
 
window.addEventListener("scroll", () => {     
  throttle(handleScrollThrottle, 250);
// cloneNode(countryTemplate, countriesContainer, countriesData[lastCountryDisplayed + 1])
// lastCountryDisplayed += 1
});

const cloneNode = (template, container, countryData) => {
    console.log(countriesData);
    console.log(countryData.country);
    const clonedTemplate = template.cloneNode(true)
    clonedTemplate.classList.add("country")
    clonedTemplate.classList.remove("country-template")

    container.appendChild(clonedTemplate)
    newCountry = container.lastChild
    const countryName = newCountry.querySelector(".country__name")
    const countryPopulation = newCountry.querySelector(".country__population")
    const countryCapital = newCountry.querySelector(".country__capital")
    const countryFlag = newCountry.querySelector(".country__flag")
   
    addTextContent(countryName, `${countryData.country.name.common}`)
    addTextContent(countryPopulation, `Population: ${countryData.country.population}`)
    if(countryData.country.hasOwnProperty('capital')) {
        addTextContent(countryCapital, `Capital: ${countryData.country.capital[0]}`)
    } else {
        addTextContent(countryCapital, `Capital: n/a`)
    }    
     // countryFlag.src = `./public/flags/4x3/${countryData.country.cca2.toLowerCase()}.svg`
     countryFlag.src = countryData.country.flags.svg
     countryFlag.alt = `Flag of ${countryData.country.name.common}`
    unhideElement(newCountry, "country_hidden")
}
