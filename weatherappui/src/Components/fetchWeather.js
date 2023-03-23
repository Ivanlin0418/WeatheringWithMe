
import axios from 'axios';

const URL = 'https://api.openweathermap.org/data/2.5/weather';
const FORECAST_URL_API = 'https://api.openweathermap.org/data/2.5/forecast'
const API_KEY= 'df707e4eb51d88e2916b20527dcabf63'


export const fetchWeather = async (query) => {
    const { data } = await axios.get(URL, {
        params: {
            q: query,
            units: 'metric',
            APPID: API_KEY,
        }
    } ).catch(err => console.log(err));
    return data;
}




export const fetchForecast = async (lat, lon) => {
    const { data } = await axios.get(FORECAST_URL_API, {
        params: {
            lat:lat.toFixed(2),
            lon:lon.toFixed(2),
            appid: API_KEY,
        }
    }
    ).catch(err => console.log(err));
    // console.log (data)
    return data;

}
