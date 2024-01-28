const express = require("express");
const fetch = require('node-fetch');
const app = express();

const PORT = 3000;

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

const apiKey = "836a9ed8a8ad76d9856467e47a8cb95d";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?&units=metric&q=";
const time_api = "rACUUFdxACZt5M0BpseP7w==lqrxg2rci29bvTOk";
app.get('/', (req, res)=>{
    res.render("index");
});

app.post("/", async (req, res)=>{
    try {
    const city = req.body.city;
    const response = await fetch(`${apiUrl}${city}&appid=${apiKey}`);
    const weatherData = await response.json();
    const timeApiUrl = `https://api.api-ninjas.com/v1/worldtime?city=${weatherData.name}&apiKey=${time_api}`; 

    const timeResponse = await fetch(timeApiUrl);
    const timeData = await timeResponse.json();
    res.render("index", { weatherData: weatherData, timeData: timeData});
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Internal Server Error');
    }
});



app.listen(PORT, ()=>{
    console.log("Server runs at port " + PORT);
});