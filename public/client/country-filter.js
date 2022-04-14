export function countryFilter() {
    const filterInput = document.querySelector(".filter-row__input")
    filterInput.addEventListener("input", () => {
        const searchArray = []
        let searchBoxValue = filterInput.value        
        const countryElements = document.querySelectorAll(".country")

        // Removes all countries currently on display
        //  todo: only remove the countries that don't fit the search criteria
        countryElements.forEach(countryElement => {
            (countryElement.remove());
        })

        // Creates an array of country names in alphabetical order, used for getting the index in the countriesData array
        countryNameArray.forEach((country, index) => {
            if (country.toLowerCase().search(searchBoxValue.toLowerCase()) !== -1) {
                searchArray.push(countriesData[index])
            } 
        })
        // if statment that checks if the search box is empty, if it is then just load a set amount of articles
        // to do: reshow the articles that were previously on the screen 
        if(searchBoxValue === "") {
            countriesDisplayed = 0
            for(let i = 0; i < countriesToShowPerLoad; i++) {
                cloneNode(countryTemplate, countriesContainer, countriesData[i])
                console.log(countriesData[i]);
            }

        } else {
            searchArray.forEach((country) => {
                cloneNode(countryTemplate, countriesContainer, country)
            })
        }    
    })
}