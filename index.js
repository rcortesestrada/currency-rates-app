const express = require('express');
const fetch = require('node-fetch').default;
require('dotenv').config();

const API_KEY = process.env.API_KEY;

const app = express();
const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Listening at ${port}`);    
});

app.use(express.static('public'));

app.get('/live/:requestInfo', async (request, response) => {
    const requestInfo = request.params.requestInfo.split(',');
    console.log(requestInfo);
    
    const typeOfRequest = requestInfo[0];
    const base = requestInfo[1];
    const symbol = requestInfo[2];

    console.log(typeOfRequest, base, symbol);
    
    const url = `https://api.exchangerate.host/${typeOfRequest}?source=${base}&currencies=${symbol}&access_key=${API_KEY}`;
    console.log(url);
    const fetch_response = await fetch(url);
    const json = await fetch_response.json();
    response.json(json);
    console.log(json);
});

app.get('/convert/:requestInfo', async (request, response) => {
    const requestInfo = request.params.requestInfo.split(',');
    console.log(requestInfo);

    const typeOfRequest = requestInfo[0];
    const base = requestInfo[1];
    const symbol = requestInfo[2];
    const amountToConvert = requestInfo[3];

    console.log(typeOfRequest, base, symbol, amountToConvert);

    const url = `https://api.exchangerate.host/${typeOfRequest}?from=${base}&to=${symbol}&amount=${amountToConvert}&access_key=${API_KEY}`;
    console.log(url);

    const fetch_response = await fetch(url);
    const json = await fetch_response.json();
    response.json(json);
});

app.get('/historical/:requestInfo', async (request, response) => {
    const requestInfo = request.params.requestInfo.split(',');
    console.log(requestInfo);

    const typeOfRequest = requestInfo[0];
    const base = requestInfo[1];
    const symbol = requestInfo[2]
    const historicalDate = requestInfo[3];

    const url = `https://api.exchangerate.host/${typeOfRequest}?date=${historicalDate}&source=${base}&currencies=${symbol}&format=0&access_key=${API_KEY}`;
    console.log(url);

    const fetch_response = await fetch(url);
    const json = await fetch_response.json();
    response.json(json);
    console.log(json);
});

app.get('/chart/:requestInfo', async (request, response) => {

    const requestInfo = request.params.requestInfo.split(',');

    const base = requestInfo[0];

    const url = `https://api.exchangerate.host/live?source=${base}&format=0&access_key=${API_KEY}`;
    console.log(url);

    const fetch_response = await fetch(url);
    const json = await fetch_response.json();
    response.json(json);
    console.log(json)
})