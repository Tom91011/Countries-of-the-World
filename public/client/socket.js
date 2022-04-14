const socket = io();

let countriesData = []
const countryNameArray = []
const countriesToShowPerLoad = 6
let countriesDisplayed = 0
let lastCountryDisplayed = countriesToShowPerLoad - 1

const filterInput = document.querySelector(".filter-row__input")
const countryTemplate = document.querySelector(".country-template")
const countriesContainer = document.querySelector(".countries")

const unhideElement = (element, cssClass) => element.classList.remove(cssClass)
const addTextContent = (element, text) => element.textContent = text

socket.on('sendCountriesData', async (countriesDataFromDb) => {
    countriesData = countriesDataFromDb

    await countriesData.forEach(country => {
        countryNameArray.push(country.country.name.common.toLowerCase())
    })

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
            console.log("cloned new country");
           
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

const cloneNode = (template, container, countryData) => {
    const clonedTemplate = template.cloneNode(true)
    clonedTemplate.classList.add("country")
    clonedTemplate.classList.remove("country-template")

    container.appendChild(clonedTemplate)
    newCountry = container.lastChild
    const countryName = newCountry.querySelector(".country__name")
    const countryPopulation = newCountry.querySelector(".country__population")
    const countryCapital = newCountry.querySelector(".country__capital")
    const countryRegion = newCountry.querySelector(".country__region")
    const countryFlag = newCountry.querySelector(".country__flag")
   
    addTextContent(countryName, `${countryData.country.name.common}`)
    addTextContent(countryPopulation, `Population: ${countryData.country.population}`)
    addTextContent(countryRegion, `Region: ${countryData.country.region}`)
    if(countryData.country.hasOwnProperty('capital')) {
        addTextContent(countryCapital, `Capital: ${countryData.country.capital[0]}`)
    } else {
        addTextContent(countryCapital, `Capital: n/a`)
    }    
    countryFlag.src = `./public/flags/4x3/${countryData.country.cca2.toLowerCase()}.svg`
    countryFlag.alt = `Flag of ${countryData.country.name.common}`
    lastCountryDisplayed +=1
    unhideElement(newCountry, "country_hidden")
    countriesDisplayed += 1
}
