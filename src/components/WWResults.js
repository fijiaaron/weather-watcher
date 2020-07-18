import React from 'react';

class WWResults extends React.Component
{
	render()
	{
		let city = this.props.city;
		let country = this.props.country;

		return (
			<div className="WW_Results">

				<div className="WW_Result">
					<div className="WW_Location">
						{city} {country}
					</div>

					<div className="WW_Temperature">
						{this.props.temperature}
					</div>
					
					<div className="WW_Weather">
						{this.props.weather}
					</div>

					<div className="WW_Weather_Icon">
						<img src={this.props.icon} alt={this.props.description} title={this.props.description} />
					</div>

					<div className="WW_Wind">
						{this.props.wind}
						&nbsp;
						{this.props.direction}
					</div>
				</div>

				
			</div>
		);
	}
}


export default WWResults;