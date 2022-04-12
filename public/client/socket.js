const socket = io();
console.log("working");

socket.on('sendCountriesData', (countriesData) => {
    console.log(countriesData);
})

socket.on("hello", (arg) => {
    console.log(arg); // world
  });