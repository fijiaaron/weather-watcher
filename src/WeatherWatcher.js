import React from 'react';

import './WeatherWatcher.css';
import WWHeader from './components/WWHeader';
import WWSearcher from './components/WWSearcher';
import WWResults from './components/WWResults';
import WWFooter from './components/WWFooter';
import WWDev from './components/WWDev';
import { getCardinalDirection, getCardinalArrow }from './lib/getCardinalDirection';

const UNITS="imperial"; // metric or imperial
const TEMP_SYMBOL = UNITS === 'metric' ? "C" : "F";
const LOCATION="Honolulu"; // city,country or zipcode
const DEFAULT_LOCATION=LOCATION;
const OPENWEATHER_API_KEY = process.env.REACT_APP_OPENWEATHER_API_KEY

var getPosition = function (options) {
	return new Promise(function (resolve, reject) {
		navigator.geolocation.getCurrentPosition(resolve, reject, options);
	});
}

class WeatherWatcher extends React.Component
{
	componentDidMount()
	{
		getPosition()
			.then( (position) => {
				console.log('position', position);
				this.setState({latitude: position.coords.latitude, longitude: position.coords.longitude});
			})
			.catch( (error) => {
				console.log(error);
				this.setState({location: DEFAULT_LOCATION});
			})
			.finally( () => {
				console.log('after getPosition???')
				if (OPENWEATHER_API_KEY) {
					this.setState(this.getWeather());
				}
			});
	}

	render() {
		return (
			<div className="WW_App">
				<WWHeader/>
				<WWSearcher getWeather={this.getWeather}/>
				<WWResults 
					city={this.state.city}
					country={this.state.country}
					weather={this.state.weather}
					description={this.state.description}
					icon={this.state.icon}
					clouds={this.state.clouds}
					visibility={this.state.visibility}
					humidity={this.state.humidity}
					pressure={this.state.pressure}
					temperature={this.state.temperature}
					wind={this.state.wind}
					direction={this.state.direction}
					error={this.state.error}
					/>
				<WWFooter/>
				<WWDev/>
			</div>
		)
	}

	state = {
		location: undefined,
		latitude: undefined,
		longitude: undefined,
		city: undefined,
		country: undefined,
		coords: undefined,
		temperature: undefined,
		humidity: undefined,
		pressure: undefined,
		visibility: undefined,
		wind: undefined,
		direction: undefined,
		clouds: undefined,
		weather: undefined,
		description: undefined,
		icon: undefined,
		error: undefined
	}

	// Arrow function binds this to component
	getWeather = async (event) => {
		
		if (event) { 
			event.preventDefault();
			location = event.target.location.value;
		}

		let location = this.state.location;
		let lat = this.state.latitude;
		let lon = this.state.longitude;
		let URL = `http://api.openweathermap.org/data/2.5/weather?q=${location}&units=${UNITS}&appid=${OPENWEATHER_API_KEY}`

		if (location)
		{
			console.log('location', location);
		}
		if (! location && lat && lon) {	
			console.log("lat and lon", lat, lon);
			URL = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${UNITS}&appid=${OPENWEATHER_API_KEY}`
		}
		
		console.log(URL);
	
		const weatherResponse = await fetch(URL); 
		const data = await weatherResponse.json();
		console.log(data);
		const weather = mapWeatherData(data);
		console.log(weather);
		this.setState(weather);
	}
}

function mapWeatherData(data)
{
	let coords = `${data.coord.lon},${data.coord.lat}`;
	let temp = `${Math.floor(data.main.temp)}°${TEMP_SYMBOL}`;
	let wind = `${Math.floor(data.wind.speed)}kt`;
	let direction = getCardinalArrow(getCardinalDirection(data.wind.deg));
	let icon = `http://openweathermap.org/img/w/${data.weather[0].icon}.png`;

	let weather = {
		city: data.name,
		country: data.sys.country,
		coords: coords,
		temperature: temp,
		humidity: data.main.humidity,
		pressure: data.main.pressure,
		visibility: data.visibility,
		wind: wind,
		direction: direction,
		clouds: data.clouds.all,
		weather: data.weather[0].main,
		description: data.weather[0].description,
		icon: icon,
		error: undefined
	}

	return weather;
}

export default WeatherWatcher;
