import React from "react";
import { Card, CardTitle, ListGroup, ListGroupItem } from 'reactstrap';
import './ForecastCards.css';

const Forecastcards = ({ dayData, onClick }) => {
  if (!dayData || !dayData[0]) {
    return null;
  }

  const { timezone } = dayData[0].sys;
  const date = new Date(dayData[0].dt_txt).toLocaleDateString();
  const weekday = new Date(dayData[0].dt_txt).toLocaleDateString(undefined, { weekday: 'long' });

  const handleonClick = () => {
    onClick()
  }

  return (
    <div onClick={handleonClick} className="forecast-card-container">
      <Card>
        <CardTitle className="cardTitleDiv">
          <h5 className="TitleText">
            {date} ({weekday})
          </h5>
        </CardTitle>
        <div className="d-flex flex-column">
          <ListGroup horizontal className="fixed-size-list">
            {dayData.map((data) => {
              const date = new Date(data.dt_txt);
              const options = { timeZone: timezone, hour: 'numeric', hour12: true };
              return (
                <div className="col">
                  <ListGroupItem className="p-1 bg-light border w-100 IndividualCells">
                    <div className="ItemInfo">
                      <h5 className="DateText">{date.toLocaleTimeString([], options)}</h5>
                      <div className="TempDiv">
                        <h5 className="TemperatureText">
                          {Math.round((data.main.temp - 273.15) * 9/5 + 32)}
                          <sup className="TemperatureSymbol">&deg;F</sup>
                        </h5>
                      </div>
                    </div>
                    <div className="WeatherDiv">
                      <img className="city-icon" src={`https://openweathermap.org/img/wn/${data.weather[0].icon}.png`} alt="Weather icon representing current weather condition" />
                      <h5 className="WeatherText">{data.weather[0].description}</h5>
                    </div>
                  </ListGroupItem>
                </div>
              );
            })}
          </ListGroup>
        </div>
      </Card>
    </div>
  );
};

export default Forecastcards;
