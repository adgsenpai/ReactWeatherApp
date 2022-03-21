 
function getCoordintes() {
    var options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
    };
    function success(pos) {
        var crd = pos.coords;
        var lat = crd.latitude.toString();
        var lng = crd.longitude.toString();

        fetchWeatherDetails({"lat": lat, "long": lng});
  
    }
    function error(err) {
        console.warn(`ERROR(${err.code}): ${err.message}`);
    }
    navigator.geolocation.getCurrentPosition(success, error, options);
}

function fetchWeatherDetails(payload){
    fetch("/api/v1/getweatherinfo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
    })
    .then((res) => res.json())
    .then((data) => {
        var weather = ["cloud","rain","sun"];
        var userweather = data['weathertype']; 
        var bestmatch = "";
        var bestmatchscore = 0;
        for(var i = 0; i < weather.length; i++){
            var score = 0;
            var weathertype = weather[i];
            for(var j = 0; j < weathertype.length; j++){
                if(userweather.indexOf(weathertype[j]) > -1){
                    score++;
                }
            }
            if(score > bestmatchscore){
                bestmatch = weathertype;
                bestmatchscore = score;
            }
        }

        ReactDOM.render(<RenderWeatherTile city={data["cityname"]} temp={Math.round(data["temp"])} weather={bestmatch}/>, document.getElementById('WeatherUI'))
        
    })
    .catch((err) => console.log(err));
}