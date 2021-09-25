'use strict';


const express = require('express');
require('dotenv').config();
const cors = require('cors');


const server = express();

const weatherServer = require('/data/weather.json');


const PORT = process.env.PORT;

server.use(cors());

// localhost:3005/
// https://class07-301d33.herokuapp.com/


server.get('/',(req,res)=>{
    res.status(200).send('home route')
})

// localhost:3005/test
// https://class07-301d33.herokuapp.com/test
server.get('/test',(request,response)=>{
    response.send('api server is working')
})


class Forecast {
    constructor(date, description) {
        this.description = description;
       
        this.date = date;
      
    }
}

// localhost:3005/getPokemon?pokeName=charmander&pokeLevel=10
// https://class07-301d33.herokuapp.com/?pokeName=charmander&pokeLevel=10
server.get('/weatherServer',(req,res)=>{
   

    let city = req.query.city;

    console.log(req.query);
    console.log(req.query.city)

    let weather = weatherServer.find((value)=>{
        if( weather.city_name() === city) {
          
            return value
        }
        
    });

    let weatherObj = weather.data.map(weather => new Forecast
        (`date: ${weather.datetime}`,
            `lat  ${weather.lat},long ${weather.lon} info ${weather.weather.description} `));



    console.log('weather', weatherObj)
    res.send(weatherObj);

})


server.get('*',(req,res)=>{
    res.status(404).send('route is not found')
})

server.listen(PORT,()=>{
    console.log(`Listening on PORT ${PORT}`)
})