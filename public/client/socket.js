const socket = io();
let countriesData = []
let countriesToShowPerLoad = 6
let lastCountryDisplayed = countriesToShowPerLoad - 1

const countryTemplate = document.querySelector(".country-template")
const countriesContainer = document.querySelector(".countries")

const unhideElement = (element, cssClass) => element.classList.remove(cssClass)
const addTextContent = (element, text) => element.textContent = text

const cloneNode = (template, container, country) => {
    const clonedTemplate = template.cloneNode(true)
    container.appendChild(clonedTemplate)
    newCountry = container.lastChild
    const countryName = newCountry.querySelector(".country__name")
    const countryPopulation = newCountry.querySelector(".country__population")
    const countryCapital = newCountry.querySelector(".country__capital")
    const countryFlag = newCountry.querySelector(".country__flag")
    countryFlag.src = `./public/flags/4x3/${country.country.cca2}.svg`
    countryFlag.alt = `Flag of ${country.country.name.common}`
    addTextContent(countryName, `${country.country.name.common}`)
    addTextContent(countryPopulation, `Population: ${country.country.population}`)
    if(country.country.hasOwnProperty('capital')) {
        addTextContent(countryCapital, `Capital: ${country.country.capital[0]}`)
    } else {
        addTextContent(countryCapital, `Capital: n/a`)
    }    
    unhideElement(newCountry, "country_hidden")
}

socket.on('sendCountriesData', (countriesDataFromDb) => {
    countriesData = countriesDataFromDb

    for(let i = 0; i < countriesToShowPerLoad; i++) {
        cloneNode(countryTemplate, countriesContainer, countriesDataFromDb[i])
    }
})
// Stops the scroll repeating multiple times
let throttleTimer;

const handleScrollThrottle = () => {
  const scrollBuffer = 400
  
  if(window.innerHeight + window.scrollY >= document.body.scrollHeight - scrollBuffer){
     
        for(let i = 0; i < countriesToShowPerLoad; i++) {
            if(lastCountryDisplayed != countriesData.length - 1) {
            cloneNode(countryTemplate, countriesContainer, countriesData[lastCountryDisplayed + 1])
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
});