require('dotenv').config(); // Load environment variables

const express = require("express");
const https = require("https");
// const fetch = require('node-fetch');
const bodyParser = require("body-parser")
const path = require('path');

const app = express();

app.use(bodyParser.urlencoded({extended:true}))

app.use(express.static(path.join(__dirname, 'public')));


app.get('/getWeather', async (req, res) => {
  
  const city = req.query.city;
  const apiKey = process.env.API_KEY; 
  const unit="metric";

  try {
      const apiResponse = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${unit}`);
      const data = await apiResponse.json();

      res.json(data); // Sending data to the frontend
      
  } catch (error) {
      console.error('Error fetching weather data:', error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(3000, function () {
  console.log("Server is running on port 3000");
});



