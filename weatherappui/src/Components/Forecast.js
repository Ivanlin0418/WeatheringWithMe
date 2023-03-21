import { fetchForecast } from "./Fetchweather";
import React, { Component } from "react";
import Forecastcards from "./Forecastcards";
import { Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle } from 'reactstrap';

class Forecast extends Component {
  state = {
    forecastData: [],
    error: null,
  };

  async componentDidMount() {
    const { WeatherData } = this.props;

    try {
      const data = await fetchForecast(WeatherData.coord.lat, WeatherData.coord.lon);
      const forecastData = [];

      for (let i = 0; i < 5; i++) {
        const startIndex = i * 8;
        const endIndex = startIndex + 8;
        const dayData = data.list.slice(startIndex, endIndex);
        forecastData.push(dayData);
      }

      this.setState({ forecastData });
    } catch (error) {
      this.setState({ error: error.message });
    }
  }

  async componentDidUpdate(prevProps) {
    const { WeatherData } = this.props;

    // Only fetch new data if the weather data has changed
    if (prevProps.WeatherData !== WeatherData) {
      try {
        const data = await fetchForecast(WeatherData.coord.lat, WeatherData.coord.lon);
        const forecastData = [];

        for (let i = 0; i < 5; i++) {
          const startIndex = i * 8;
          const endIndex = startIndex + 8;
          const dayData = data.list.slice(startIndex, endIndex);
          forecastData.push(dayData);
        }

        this.setState({ forecastData });
      } catch (error) {
        this.setState({ error: error.message });
      }
    }
  }

  render() {
    const { forecastData } = this.state;
    return (
      <div>
        {forecastData.map((dayData, index) => (
          <Forecastcards key={index} dayData={dayData} />
        ))}
      </div>
    );
  }
}

export default Forecast;
