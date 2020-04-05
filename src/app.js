// CORE MODULES
const path = require('path')

// NPM MODULES
const express = require('express')
const hbs = require('hbs')

// VARIABLES
const app = express()
// Heroku defined port or fallback to 3000
const port = process.env.PORT || 3000
const geocode = require('../src/utils/geocode')
const forecast = require('../src/utils/forecast')
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve.
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Joshua Osburn'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address!'
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if (error) {
            return res.send({ error })
        }

        // The forecast function takes a callback as the 3rd parameter.
        // The 2nd parameter of the callback takes an object.
        // We can use object destructuring to retrieve those properties.
        forecast(latitude, longitude, (error, {description, temperature, feels_like, temp_min, temp_max, humidity} = {}) => {
            if (error) {
                // Object property shorthand - error: error === error
                return res.send({ error })
            }

            res.send({ location, description, temperature, feels_like, temp_min, temp_max, humidity })
        })
    })

})

//404 error page. This has to come last because
// every page request will match a wildcard.
app.get('*', (req, res) => {
    res.render('404', {
        title: '404 - Page not found',
        errorMessage: 'Page not found. This is not the way!'
    })
})

app.listen(port, () => {
    console.log('Server has started on port ' + port)
})