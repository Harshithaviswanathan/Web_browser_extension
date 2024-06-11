// fetchData.js

// Ensure API_key is defined before using it
const API_key = 'aab99b3ac489bbd103c8517794ea1e30';

window.onload = function () {

    var geoSuccess = function (position) {
        startPos = position;

        if (typeof API_key !== 'undefined') {
            fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${startPos.coords.latitude}&lon=${startPos.coords.longitude}&appid=${API_key}`)
                .then((response) => response.json())
                .then((jsonData) => {
                    const temperatureKelvin = jsonData.main.temp;
                    const temperatureCelsius = temperatureKelvin - 273.15;

                    const feelsLikeKelvin = jsonData.main.feels_like;
                    const feelsLikeCelsius = feelsLikeKelvin - 273.15;

                    // console.log(jsonData)

                    // console.log(jsonData.name)
                    // console.log(jsonData.main.feels_like)
                    // console.log(jsonData.main.temp)
                    // console.log(jsonData.weather[0].description)
                    fetch(`http://openweathermap.org/img/wn/${jsonData.weather[0].icon}.png`)
                        .then((res) => res.blob())
                        .then((result) => {


                            document.getElementById("text_location").innerHTML = jsonData.name
                            document.getElementById("text_location_country").innerHTML = jsonData.sys.country

                            document.getElementById("text_temp").innerHTML = Math.round(temperatureCelsius) + "°C";

                            document.getElementById("text_feelslike").innerHTML = Math.round(feelsLikeCelsius) + "°C";
                            document.getElementById("text_desc").innerHTML = jsonData.weather[0].description

                            const imageObjectURL = URL.createObjectURL(result);
                            document.getElementById("icon").src = imageObjectURL

                        })
                })
                .catch((error) => {
                    console.error('Error fetching data:', error);
                });
        } else {
            console.error('API_key is not defined. Make sure to define it in popup.html.');
        }

    };
    navigator.geolocation.getCurrentPosition(geoSuccess);

}
