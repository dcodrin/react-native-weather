const WEATHER_API_KEY = "380170ad0ee01fe048ecc89e68a8b13d";
const ROOT_URL = `http://api.openweathermap.org/data/2.5/weather?appid=${WEATHER_API_KEY}&units=metric`;

export default (lat, lon) => {
    const weatherUrl = `${ROOT_URL}&lat=${lat}&lon=${lon}`;
    return fetch(weatherUrl).then(res => {
        return res.json();
    }).then(weatherData => {
        const {name, main: {temp}, weather: [{description}]} = weatherData;
        return {name, temperature: temp, description};
    }).catch(err => console.log(err));
};