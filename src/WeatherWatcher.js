import React from 'react';

import './WeatherWatcher.css';
import WWHeader from './components/WWHeader';
import WWSearcher from './components/WWSearcher';
import WWResults from './components/WWResults';
import WWFooter from './components/WWFooter';
import { getCardinalDirection, getCardinalArrow }from './lib/getCardinalDirection';

const UNITS="imperial"; // metric or imperial
const TEMP_SYMBOL = UNITS === 'metric' ? "C" : "F";

const LOCATION="Libby,US"; // city,country or zipcode
const OPENWEATHER_API_KEY = process.env.OPENWEATHER_API_KEY;
// const OPENWEATHER_ENDPOINT = `http://api.openweathermap.org/data/2.5/weather?q=${LOCATION}&units=${UNITS}&APPID=${OPENWEATHER_API_KEY}`;

class WeatherWatcher extends React.Component
{
	componentDidMount()
	{
		this.state = this.getWeather();
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
			</div>
		)
	}

	state = {
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
		let location = LOCATION;
		
		if (event) { 
			event.preventDefault();
			location = event.target.location.value;
		}
		
		console.log(location);

		let URL = `http://api.openweathermap.org/data/2.5/weather?q=${location}&units=${UNITS}&APPID=${OPENWEATHER_API_KEY}`

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
