const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const locationMessage = document.querySelector('#locationMessage')
const weatherData = document.querySelector('#weatherData')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    weatherData.textContent = ''

    const location = search.value
    const url = '/weather?address=' + location

    locationMessage.textContent = 'Loading...'
    fetch(url).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                locationMessage.textContent = data.error
            } else {
                locationMessage.textContent = data.location
                weatherData.textContent = data.description + ' | Temp: ' + data.temperature + 'F | Humidity: ' + data.humidity + '%'
            }
        })
    })
})