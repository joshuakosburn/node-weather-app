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
            callback(undefined, {
                description: body.weather[0].description,
                temperature: body.main.temp,
                humidity: body.main.humidity
            })
        }
    })
}

module.exports = forecast