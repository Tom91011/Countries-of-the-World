const socket = io();

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
    addTextContent(countryName, `${country.country.name.common}`)
    addTextContent(countryPopulation, `Population: ${country.country.population}`)
    if(country.country.hasOwnProperty('capital')) {
        addTextContent(countryCapital, `Capital: ${country.country.capital[0]}`)
    } else {
        addTextContent(countryCapital, `Capital: n/a`)
    }
    unhideElement(newCountry, "country_hidden")
}

socket.on('sendCountriesData', (countriesData) => {
    countriesData.forEach((country) => {
        cloneNode(countryTemplate, countriesContainer, country)
    })
})