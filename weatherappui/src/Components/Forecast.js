import { fetchForecast } from "./Fetchweather";
import React, { Component } from "react";
import Forecastcards from "./Forecastcards";
import {  Button } from 'reactstrap';

class Forecast extends Component {
  state = {
    forecastData: [],
    error: null,
    currentIndex: 0, 
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

  handleButtonClick = () => {
    this.setState(prevState => {
      const currentIndex = (prevState.currentIndex + 1) % 5;
      return { currentIndex };
    });
  };

  render() {
    const { forecastData, currentIndex } = this.state;
    const currentDayData = forecastData[currentIndex];
    return (
      <div>
        <div style={{ display: 'flex', justifyContent: 'center', margin: '20px 0' }}>
        </div>
        <Forecastcards dayData={currentDayData} onClick={this.handleButtonClick} />
      </div>
    );
  }
}

export default Forecast;
