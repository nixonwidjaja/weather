const express = require('express')
const app = express()
const port = 3000
const request = require('request')
const API_KEY = ''

app.use(express.urlencoded({extended: false}))

app.set('view engine', 'ejs')

app.get('/', (req, res) => {
    res.render('index')
})

app.post('/', (req, res) => {
    let city = req.body.city;
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
    request(url, (err, response, body) => {
        if (err) {
            console.log(err)
            res.render('index', {weather: null, error: 'Error in fetching weather'})
        } else {
            let weather = JSON.parse(body)
            console.log(weather)
            res.json(weather)
        }
    })
})

app.listen(port, () => {
    console.log(`App is listening on port ${port}`)
})
