const request = require('postman-request')

const forecast = (lat, long, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=a5b74315e37ffce5e7ce0f9cc8055e67&units=f&query=' + lat + ',' + long
    request({ url, json: true}, (error, { body } = {}) => {
        if (error) {
            callback('Unable to connect to weather service.', undefined)
        } else if (body.error) {
            callback('Unable to find location.', undefined)
        } else {
            //console.log(body.current)
            var str = body.current.weather_descriptions[0] + '.'
            str = str + ' It is currently ' + body.current.temperature + ' degrees out.'
            str = str + ' It feels like ' + body.current.feelslike + ' degrees out.'
            str = str + ' The UV index is ' + body.current.uv_index + '.'
            callback(undefined, str)
        }
    })
}

module.exports = forecast