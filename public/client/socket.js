const socket = io();
const filterInput = document.querySelector(".filter-row__input")
let countriesData = []
const countryNameArray = []
const countriesToShowPerLoad = 6
let countriesDisplayed = 0
let lastCountryDisplayed = countriesToShowPerLoad - 1

const countryTemplate = document.querySelector(".country-template")
const countriesContainer = document.querySelector(".countries")

const unhideElement = (element, cssClass) => element.classList.remove(cssClass)
const addTextContent = (element, text) => element.textContent = text

socket.on('sendCountriesData', async (countriesDataFromDb) => {
    countriesData = countriesDataFromDb
    console.log(countriesData)

    await countriesData.forEach(country => {
        countryNameArray.push(country.country.name.common.toLowerCase())
    })

    for(let i = 0; i < countriesToShowPerLoad; i++) {
        cloneNode(countryTemplate, countriesContainer, countriesDataFromDb[i])
    }


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
    console.log(countriesData);
    console.log(countriesData[countriesDisplayed]);
    // console.log(countriesData[countriesDisplayed].country.name.common.toLowerCase());
    // console.log(countryNameArray[countriesDisplayed]);
    const nextCountry = countryNameArray[countriesDisplayed]
    console.log(nextCountry);
    console.log(countryNameArray.findIndex((nextCountry) => {
        return nextCountry === countriesData[countriesDisplayed].country.name.common.toLowerCase()
    }) );
    let nextCountryIndex = countryNameArray.findIndex((nextCountry) => {
        return nextCountry === countriesData[countriesDisplayed].country.name.common.toLowerCase()
    })
   
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
   
    addTextContent(countryName, `${countriesData[nextCountryIndex].country.name.common}`)
    addTextContent(countryPopulation, `Population: ${countriesData[nextCountryIndex].country.population}`)
    addTextContent(countryRegion, `Region: ${countriesData[nextCountryIndex].country.region}`)
    if(countriesData[nextCountryIndex].country.hasOwnProperty('capital')) {
        addTextContent(countryCapital, `Capital: ${countriesData[nextCountryIndex].country.capital[0]}`)
    } else {
        addTextContent(countryCapital, `Capital: n/a`)
    }    
     countryFlag.src = `./public/flags/4x3/${countriesData[nextCountryIndex].country.cca2.toLowerCase()}.svg`
    //  countryFlag.src = countriesData[nextCountryIndex].country.flags.svg
     countryFlag.alt = `Flag of ${countriesData[nextCountryIndex].country.name.common}`
    //  lastCountryDisplayed +=1
    unhideElement(newCountry, "country_hidden")
    countriesDisplayed += 1
}
