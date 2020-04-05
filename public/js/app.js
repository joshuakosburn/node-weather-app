const weatherForm = document.querySelector('form')
const search = document.querySelector('#locationInput')
const locationText = document.querySelector('#location')
const descriptionText = document.querySelector('#description')
const feels_likeText = document.querySelector('#feels_like')
const temperatureText = document.querySelector('#temperature')
const temp_minText = document.querySelector('#temp_min')
const temp_maxText = document.querySelector('#temp_max')
const humidityText = document.querySelector('#humidity')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = search.value
    const url = '/weather?address=' + location

    fetch(url).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                locationText.textContent = data.error
            } else {
                locationText.textContent = 'Location: ' + data.location
                descriptionText.textContent = 'Description: ' + data.description
                feels_likeText.textContent = 'Feels like: ' + data.feels_like + 'F'
                temperatureText.textContent = 'Temperature: ' + data.temperature + 'F'
                temp_minText.textContent = 'Temperature Min: ' + data.temp_min + 'F'
                temp_maxText.textContent = 'Temperature Max: ' + data.temp_max + 'F'
                humidityText.textContent = 'Humidity: ' + data.humidity + '%'
            }
        })
    })
})