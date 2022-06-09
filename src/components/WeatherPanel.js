import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Card from './Card';

const WeatherPanel = () => {

  const [weather, setWeather] = useState({})

  const [forecast, setForecast] = useState({})
  const [loading, setLoading] = useState(false)
  const [showCard, setShowCard] = useState(false)
  

  useEffect(()=> {

    function success(pos) {
      var crd = pos.coords;
    
      console.log('Weather Your current position is:');
      console.log(`Latitude : ${crd.latitude}`);
      console.log(`Longitude: ${crd.longitude}`);
      console.log(`More or less ${crd.accuracy} meters.`);

      axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${crd.latitude}&lon=${crd.longitude}&appid=80e632dfc9898d3a6e886cbc937ecece
      `)
      .then(res => setWeather(res.data))

      axios.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${crd.latitude}&lon=${crd.longitude}&appid=80e632dfc9898d3a6e886cbc937ecece
      `)
      .then(res => {setForecast(res.data);
        setLoading(false);
        setShowCard(true)
      })
      .catch(error => {
        console.log(error)
        setLoading(false)
        setShowCard(false)
      })
      
    }

    
    function error(err) {
      console.log("el usuario no permitió acceder a su ubicación")
      // console.warn(`ERROR(${err.code}): ${err.message}`);
    }
    
    navigator.geolocation.getCurrentPosition(success, error);
  }, [])

  console.log(weather)
  console.log(forecast)

  return (
    <div>
      <Card 
        showData = {showCard}
        loadingData = {loading}
        weather = {weather}
        forecast = {forecast}
      />
    </div>
  );
};

export default WeatherPanel;