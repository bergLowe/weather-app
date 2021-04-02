const axios = require("axios");
const key = require("./api_key");

const forecast = (lat, long, callback) => {
    let url = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${key.w_key}&units=metric`;

    axios.get(url)
        .then(({ data }) => {
            // If we get data without error then send data.
            callback(undefined, `Temperature is ${data.main.temp}\u00B0C. ${data.weather[0].description[0].toUpperCase() + data.weather[0].description.slice(1)}.`);
        })
        .catch(err => {
            if (err.response.data.cod !== 200) {
                // If we don't get 200 successful message back, then send the 
                // error back that we got from api.
                callback(err.response.data.message[0].toUpperCase() + err.response.data.message.slice(1), undefined);
            } else {
                callback("Unable to connect to Forecast services!", undefined);
            }
        })
}

module.exports = forecast;