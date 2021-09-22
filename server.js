'use strict';

// make a variable to use the express library
const express = require('express');
require('dotenv').config();
const cors = require('cors');

// serevr has all the properities and methods in express
const server = express();

const pokeData = require('./assets/poke.json')

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

// localhost:3005/getPokemon?pokeName=charmander&pokeLevel=10
// https://class07-301d33.herokuapp.com/?pokeName=charmander&pokeLevel=10
server.get('/getPokemon',(req,res)=>{
    // res.send(pokeData);

    let pokemonName = req.query.pokeName;
    console.log(req.query);
    console.log(req.query.pokeName)
    let pokeInfo = pokeData.results.find((item)=>{
        if(item.name === pokemonName) {
            return item
        }
        
    })
    console.log('pokeInfo',pokeInfo)
    res.send(pokeInfo)

})

// localhost:3005/ANYTHING
server.get('*',(req,res)=>{
    res.status(404).send('route is not found')
})

server.listen(PORT,()=>{
    console.log(`Listening on PORT ${PORT}`)
})