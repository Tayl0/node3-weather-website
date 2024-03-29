const express = require('express')
const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')
const hbs = require('hbs')
const path = require('path')


const app = express() //expressjs.com
const port = process.env.PORT || 3000 // Heroku OR local 

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
// or else hbs items need to be in "web-server/views" folder
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath) 
hbs.registerPartials(partialsPath)

// SEtup static directory to serve
app.use(express.static(publicDirectoryPath))


app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Vooka'
    })
})
// http://localhost:3000/about
app.get('/about', (req,res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Vooka'
    })
})
// http://localhost:3000/help
app.get('/help', (req,res) => {
    res.render('help', {
        title: 'Help',
        name: 'Vooka',
        helpText: 'This is some helpful text.'
    })
})

// http://localhost:3000/weather
app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address!'
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error })
        } 
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            } 
            res.send({
                forecast: forecastData,
                location: location,
                 address: req.query.address
            })              
        })
    })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }

    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req,res) => {
    res.render('404', {
        title: '404',
        name: 'Vooka',
        errorMsg:'Help article not found.'
    })
})

// app.get('*', (req, res) => {
//     res.send('Page not found.')
// })

app.get('*', (req,res) => {
    res.render('404', {
        title: '404',
        name: 'Vooka',
        errorMsg:'Page not found.'
    })
})

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})