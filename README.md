# weatherApp

In this project, I have made a weather app which calls a public API to fetch the weather details, taking latitude and longitude as the parameters.

First, we subscribe to the public API from openweathermap. We get an API key which we use as a parameter in the API endpoint, along with the latitude and longitude.

The API endpoint is:

https://api.openweathermap.org/data/3.0/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}

On clicking Submit, we show the weather details of the particular location, such as the location name, temperature and additional information such as feels like temperature, humidity and wind speed.

You can run the project by the following command:

npm run dev
Open http://localhost:3000 to view it in your browser.
