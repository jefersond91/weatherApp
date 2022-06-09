import React from 'react';
import Loader from './Loader';
import { useState } from 'react';


const Card = ({loadingData, showData, weather, forecast}) =>{

  var today= new Date();
  var day= today.getDate();
  var month = today.getMonth() +1;
  var year = today.getFullYear();
  var date = day + '/' + month + '/' + year;
  var forecastIcon3 = ""
  var forecastIcon6 = ""
  var forecastIcon9 = ""
  var forecastDate3 = ""
  var forecastDate6 = ""
  var forecastDate9 = ""

  const [isCelsius, setIsCelsius] = useState(true)
  const changeTemperature = ()=> setIsCelsius(!isCelsius)

  if (loadingData){
    return <Loader/>
  }

  if(showData){
    forecastIcon3 =`http://openweathermap.org/img/wn/${forecast.list[0].weather[0].icon}.png`
    forecastIcon6 =`http://openweathermap.org/img/wn/${forecast.list[1].weather[0].icon}.png`
    forecastIcon9 =`http://openweathermap.org/img/wn/${forecast.list[2].weather[0].icon}.png`

    forecastDate3 = forecast.list[0].dt_txt.substring(8, 10) + '/' + forecast.list[0].dt_txt.substring(5, 7) + '/' +forecast.list[0].dt_txt.substring(0, 4) + ' ' + forecast.list[0].dt_txt.substring(11, 13)
    forecastDate6 = forecast.list[1].dt_txt.substring(8, 10) + '/' + forecast.list[1].dt_txt.substring(5, 7) + '/' + forecast.list[1].dt_txt.substring(0, 4) + ' ' + forecast.list[1].dt_txt.substring(11, 13)
    forecastDate9 = forecast.list[2].dt_txt.substring(8, 10) + '/' + forecast.list[2].dt_txt.substring(5, 7) + '/' + forecast.list[2].dt_txt.substring(0, 4) + ' ' + forecast.list[2].dt_txt.substring(11, 13)
  }

  return (
    <div className='mt-5'>
      {
        showData === true ? (
          <div className='container'>
            <div className='card mb-3 mx-auto bg-dark'>
              <div className='row g-0'>
                <div className='col-md-4'>
                  <h3 className='card-title'> {weather.name}, {weather.sys?.country} </h3>
                  <p className='card-date'>{date}</p>
                  <h4 className='card-temp'>Temperature: {isCelsius ? ( weather.main?.temp - 273.15).toFixed(2) + '°C':  ( ((weather.main?.temp - 273.15)*9/5) + 32).toFixed(2) + 'F'}</h4>
                  <p className='card-description'><img src={`http://openweathermap.org/img/wn/${weather.weather?.[0].icon}@2x.png`} alt="" />{weather.weather?.[0].description}</p>
                  <img className='background img' src="https://images.pexels.com/photos/1431822/pexels-photo-1431822.jpeg?auto=compress&cs=tinysrgb&w=700&h=450&dpr=1" alt="" />
                  <button className='card-button' onClick={changeTemperature}>{isCelsius? "To fahrenheit" : "To Celsius"} </button>
                </div >
                <div className='col-md-8'>
                  <div className='card-body text-start mt-2' >
                    <h5 className="card-text text-light">Temperature max: {isCelsius ? ( weather.main?.temp_max - 273.15).toFixed(2) + '°C':  ( ((weather.main?.temp_max - 273.15)*9/5) + 32).toFixed(2) + 'F'}</h5>
                    <h5 className="card-text text-light">Temperature min: {isCelsius ? ( weather.main?.temp_min - 273.15).toFixed(2) + '°C':  ( ((weather.main?.temp_min - 273.15)*9/5) + 32).toFixed(2) + 'F'}</h5>
                    <h5 className="card-text text-light">Relative Humidity: {weather.main?.humidity}%</h5>
                    <h5 className="card-text">Pressure: {weather.main?.pressure}hPa</h5>
                  </div>
                  <hr className='text-light'/>


                  <div className='row mt-4'>
                    <div className='col'>
                      <p className='text-light'> {forecastDate3}h</p>
                      <p className='description'><img src={forecastIcon3} alt="icon" />{forecast.list[0].weather[0].description}</p>
                      <p className='temp'>Temperature: {isCelsius ? ( forecast.list[0].main?.temp - 273.15).toFixed(2) + '°C':  ( ((forecast.list[0].main?.temp - 273.15)*9/5) + 32).toFixed(2) + 'F'}</p>
                    </div> 
                    <div className='col'>
                      <p className='text-light'> {forecastDate6}h</p>
                      <p className='description'><img src={forecastIcon6} alt="icon" />{forecast.list[1].weather[0].description}</p>
                      <p className='temp'>Temperature: {isCelsius ? ( forecast.list[1].main?.temp - 273.15).toFixed(2) + '°C':  ( ((forecast.list[1].main?.temp - 273.15)*9/5) + 32).toFixed(2) + 'F'}</p>
                    </div>
                    <div className='col'>
                      <p className='text-light'> {forecastDate9}h</p>
                      <p className='description'><img src={forecastIcon9} alt="icon" />{forecast.list[2].weather[0].description}</p>
                      <p className='temp'>Temperature: {isCelsius ? ( forecast.list[2].main?.temp - 273.15).toFixed(2) + '°C':  ( ((forecast.list[2].main?.temp - 273.15)*9/5) + 32).toFixed(2) + 'F'}</p>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>

        ):(
          <h2>sin datos, el usuario no permitío acceder a la ubicación</h2>
        )
      }
    </div>
  );
};

export default Card;