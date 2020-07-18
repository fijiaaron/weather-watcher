import React from 'react';

function WWDev() {
    return(
        <pre>
            <small> You are running this app in {process.env.NODE_ENV} </small>
            <p/>
            <small> Your API key is: {process.env.REACT_APP_OPENWEATHER_API_KEY} </small>
        </pre>
    )
}

export default WWDev;