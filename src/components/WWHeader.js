import React from 'react';
import logo from '../logo.svg';

function WWHeader()
{
	return (
		<div className="WW_Header">
			<h1>
				WEATHER 
				<img src={logo} className="logo" alt="Weather Watcher Logo"/>
				WATCHER
			</h1>
		</div>
	);
}

export default WWHeader;