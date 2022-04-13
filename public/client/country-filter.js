export function countryFilter(user) {
    const filterInput = document.querySelector(".filter-row__input")
    filterInput.addEventListener("input", () => {
        const searchArray = []
        let searchBoxValue = filterInput.value

        countryNameArray.forEach((country, index) => {
            if (country.toLowerCase().search(searchBoxValue.toLowerCase()) !== -1) {
                console.log(country);
                console.log(index);
            } 
        })
    })
}