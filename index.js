const express = require('express')
const app = express();


const path = require('path');
const fetch = require('node-fetch');

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:true}));

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

const key = 'ba9321c489c75d3a7f0c21c0199f92f9';
let city = 'Tartu';


app.get('/', function (req, res) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${
        city}&appid=${key}`)
        .then((responce) => {
            return responce.json()
        })
        .then((data) => {
            let description = data.weather[0].description
            let city = data.name
            let temp = Math.round(parseFloat(data.main.temp)-273.15)
            res.render('index', {
                description: description,
                city: city,
                temp: temp
            })
        })

});


app.post('/', function (req, res){
    let city = req.body.cityname
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}`)
.then((responce) => {
        return responce.json()
    })
        .then((data) => {
            let description = data.weather[0].description
            let city = data.name
            let temp = Math.round(parseFloat(data.main.temp) - 273.15)
            res.render('index', {
                description: description,
                city: city,
                temp: temp
            })
        })
})

app.listen(3000)
