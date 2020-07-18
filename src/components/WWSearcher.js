import React from 'react';

class WWSearcher extends React.Component
{
	render()
	{
		return (
			<div className="WW_Searcher">
				<form id="WW_Search_Form" className="WW_Search_Form" onSubmit={this.props.getWeather}>
					<label htmlFor="WW_Search_Field">Find local weather in</label>
					<input name="location" id="WW_Search_Field" className="WW_Search_Field" type="text" placeholder="search by city country or zip code" max-length="40"></input> 
					{/* <button>&#8617;</button> */}
				</form>
			</div>
		)
	}
}

export default WWSearcher;