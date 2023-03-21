import { React, useCallback } from "react";
import { Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle, ListGroup, ListGroupItem, Button } from 'reactstrap';
import './Forecastcards.css'

const Forecastcards = ({ dayData, onCardClick }) => {

  const handleCardClick = useCallback(() => {
    if (typeof onCardClick === 'function') {
      onCardClick();
    }
  }, [onCardClick]);

  const { timezone } = dayData[0].sys;

  return (
    <div class="mid">
      <Card style={{width: '20rem'}} onClick={handleCardClick} class="entirecard" >
        <CardTitle tag="h5" class="text-justify">
          {new Date(dayData[0].dt_txt).toLocaleDateString()}
        </CardTitle>

        <div className="d-flex flex-column">
          <ListGroup flush horizontal>
            {dayData.map((data) => {
              const date = new Date(data.dt_txt);
              const options = { timeZone: timezone, hour: 'numeric', hour12: true };
              return (
                <div className="col">
                  <ListGroupItem className="p-1 bg-light border">
                    Time: {date.toLocaleTimeString([], options)} <br/>
                    Temperature: {Math.round((data.main.temp - 273.15) * 9/5 + 32)}<sup>&deg;F</sup>  <br></br>  
                    Weather: {data.weather[0].description}
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
