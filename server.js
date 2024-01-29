const express = require("express");
const fetch = require('node-fetch');
const app = express();

const PORT = 3000;

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

const weatherApiKey = "836a9ed8a8ad76d9856467e47a8cb95d";
const weatherApiUrl = "https://api.openweathermap.org/data/2.5/weather?&units=metric&q=";
const timeApiKey = "CIUMD4DS31U9";
const timeApiUrl = "http://api.timezonedb.com/v2.1/get-time-zone";

async function getLocalTime(city) {
    try {
        const weatherResponse = await fetch(`${weatherApiUrl}${city}&appid=${weatherApiKey}`);
        const weatherData = await weatherResponse.json();

        if (weatherData.cod !== '404') {
            const timezone = weatherData.timezone;

            const timeResponse = await fetch(`${timeApiUrl}?key=${timeApiKey}&format=json&by=position&lat=${weatherData.coord.lat}&lng=${weatherData.coord.lon}`);
            const timeData = await timeResponse.json();

            if (timeData.status === 'OK') {
                const localTime = new Date(timeData.timestamp * 1000 + timezone * 1000);
                return localTime.toLocaleTimeString();
            }
        }

        return null;
    } catch (error) {
        console.error('Error:', error);
        return null;
    }
}

app.get('/', (req, res)=>{
    res.render("index");
});

app.post("/", async (req, res)=>{
    try {
        const city = req.body.city;
        const response = await fetch(`${weatherApiUrl}${city}&appid=${weatherApiKey}`);
        const weatherData = await response.json();

        const localTime = await getLocalTime(city);

        res.render("index", { weatherData: weatherData, localTime: localTime });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Internal Server Error');
    }
});

app.listen(PORT, ()=>{
    console.log("Server runs at port " + PORT);
});
