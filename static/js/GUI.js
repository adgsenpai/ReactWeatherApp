RenderTile();

function RenderWeatherTile(props){
    var WeatherObject = (
        <div className={"weather-card "+props.city}>
            <div className={"weather-icon " + props.weather}></div>
            <h1>{props.temp}º</h1>
            <p>{props.city}</p>
	    </div>
    );
    return WeatherObject;
}

function RenderTile()
{
    getCoordintes();
}