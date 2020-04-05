const request = require('request')

const owKey = 'bd7fcdd77419aab3e9528ba2c3ac60c6'

const forecast = (lat, lon, callback) => {
    // The OpenWeather service. The URL is appended with the address and our secret api key.
    const url = 'https://api.openweathermap.org/data/2.5/weather?lat=' + encodeURIComponent(lat) + '&lon=' + encodeURIComponent(lon) + '&appid=' + owKey + '&units=imperial'
    
    request({ url, json: true}, (error, { body }) => {
        if (error) {
            console.log(error)
            callback('Unable to connect to weather service!', undefined)
        } else if (body.message) {
            callback('Invalid coordinates. Try another search.', undefined)
        } else {
            console.log(body.main.feels_like)
            let description = body.weather[0].description.charAt(0).toUpperCase() + body.weather[0].description.slice(1),
                temperature = body.main.temp,
                feels_like = body.main.feels_like,
                temp_min = body.main.temp_min,
                temp_max = body.main.temp_max,
                humidity = body.main.humidity

            callback(undefined, {
                description,
                temperature,
                feels_like,
                temp_min,
                temp_max,
                humidity
            })
        }
    })
}

module.exports = forecast