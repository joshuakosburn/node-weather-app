const request = require('request')

const geoKey = 'pk.eyJ1Ijoiam9zYnVybiIsImEiOiJjazg4M2RlYzgwNGZxM21xdno5NnI0MHBuIn0._D0y-CtK-CVcUqFmHks6rw'

const geocode = (address, callback) => {
    // The Geolocation service. The URL is appended with the address and our secret api key.
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=' + geoKey
    
    request({ url, json: true}, (error, { body }) => {
        if (error) {
            callback('Unable to connect to location services!', undefined)
        } else if (body.features.length === 0) {
            callback('Unabled to find location. Try another search.', undefined)
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode