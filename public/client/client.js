const countryTemplate = document.querySelector(".country-template")
const countriesContainer = document.querySelector(".countries")

const cloneNode = (template, container) => {
    const clonedTemplate = template.cloneNode(true)
    container.appendChild(clonedTemplate)
}

let i = 0
while (i < 10) {
    cloneNode(countryTemplate, countriesContainer)
    i++
}