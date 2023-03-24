import React from "react";
import { Card, CardTitle, ListGroup, ListGroupItem } from 'reactstrap';
import './Forecastcards.css';

const Forecastcards = ({ dayData, onClick}) => {
  if (!dayData || !dayData[0]) {
    return null;
  }


  const {timezone} = dayData[0].sys;
  const date = new Date(dayData[0].dt_txt).toLocaleDateString();
  const weekday = new Date(dayData[0].dt_txt).toLocaleDateString(undefined, { weekday: 'long' });

  const handleonClick = () =>{
    onClick()
  }


  return (
    <div onClick={handleonClick}>
      <Card style={{width: '100%', fontFamily : 'monospace', backgroundColor : '#a9dce3', margin: '0 auto', }} className="rounded-3" >
        <CardTitle tag="h5" style={{height: '20px'}}>
          <h5 style={{textAlign : 'center', fontSize: '20px', color : '#7689de'}} className="CardTitle">
          {date} ({weekday})
          </h5>
        </CardTitle>
        <div className="d-flex flex-column">
          <ListGroup horizontal >
            {dayData.map((data) => 
              {
                const date = new Date(data.dt_txt);
                const options = { timeZone: timezone, hour: 'numeric', hour12: true };
                return (
                  <div className="col">
                    <ListGroupItem className="p-1 bg-light border IndividualCells" style={{ color: '#7689de', height: '130px'}}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                    <h5 style={{ display: 'inline-block', fontSize: '12px', color: '#7689de', flex: 1 }}>
                      {date.toLocaleTimeString([], options)}
                    </h5>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <h5 style={{ display: 'inline-block', marginBottom: '0px', fontSize: '12px', color: '#7689de', marginLeft: '10px' }}>
                        {Math.round((data.main.temp - 273.15) * 9/5 + 32)}
                        <sup style={{ fontSize: '12px', color: '#7689de' }}>
                          &deg;F
                        </sup>
                      </h5>
                    </div>
                  </div>
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '-25px', textAlign: 'center'}}>
                        <img className="city-icon" src={`https://openweathermap.org/img/wn/${data.weather[0].icon}.png`} alt="Weather icon representing current weather condition"/>
                        <h5 style={{ fontSize: '16px', margin: '-7px', color : '#7689de', }}>
                          {data.weather[0].description}
                        </h5>
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