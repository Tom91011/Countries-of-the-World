const countryTemplate = document.querySelector(".country-template")
const countriesContainer = document.querySelector(".countries")

const unhideElement = (element, cssClass) => element.classList.remove(cssClass)
const addTextContent = (element, text) => element.textContent = text

// This function copies a template
const cloneNode = (template, container, data) => {
    const clonedTemplate = template.cloneNode(true)
    container.appendChild(clonedTemplate)
    newCountry = container.lastChild
    const countryPopulation = newCountry.querySelector(".country__population")
    const countryCapital = newCountry.querySelector(".country__capital")
    addTextContent(countryPopulation, `Population: ${data}`)
    addTextContent(countryCapital, `Capital: Lisbon`)
    unhideElement(newCountry, "country_hidden")
}

let i = 0
while (i < 10) {
    data = (i + 1) * 1000
    cloneNode(countryTemplate, countriesContainer, data)
    i++
}

let countriesData = []


    // fetch('https://restcountries.com/v3.1/all')
    // .then(response => response.json())
    // .then(data => console.log(data))
    

    getText('https://restcountries.com/v3.1/all')

    async function getText(file) {
        let myObject = await fetch(file);
        // myObject = myObject.json
        let myText = await myObject.json();
        countriesData =  await myText
        console.log(countriesData);

        countriesData.forEach((country) => {console.log(country.name.common)})

        console.log(countriesData.length);
    }
        // document.getElementById("demo").innerHTML = myText;


// const countriesData = getCountriesData()



