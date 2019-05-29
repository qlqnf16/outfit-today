import React from "react";
import "../config/css/weather-icons.css";
import styled from "styled-components";

const KetoCe = kelvin => {
  return (kelvin - 273.15).toFixed(0);
};

const FlexContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const Icon = styled.i`
  font-size: 200px;
  margin-right: 25px;
`;

const WeatherInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ContentText = styled.div`
  display: flex;
  align-itmes: center;
  font-size: 1rem;
  font-weight: 300;
  color: #7b7b7b;
`;

const Temperature = styled.div`
  display: flex;
  justify-content: start;
  font-size: 5rem;
  font-weight: 700;
`;

const RegularSpan = styled.span`
  font-weight: 400;
  font-size: 3rem;
  margin-top: 15px;
`;

const Blue = styled.span`
  color: #32a1ff;
`;

const Red = styled.span`
  color: #f53f3c;
`;

const WeatherInfo = props => {
  let weatherIcon;
  const weatherId = props.weather.weather[0].id;
  if (weatherId === 800) weatherIcon = "wi-day-sunny";
  else if (weatherId === 801) weatherIcon = "wi-day-cloudy";
  else if (weatherId > 800 && weatherId < 900) weatherIcon = "wi-cloud";
  else if (weatherId > 700 && weatherId < 800) weatherIcon = "wi-dust";
  else if (weatherId >= 600 && weatherId < 700) weatherIcon = "wi-snow";
  else if (weatherId >= 500 && weatherId < 505) weatherIcon = "wi-rain";
  else if (weatherId === 511) weatherIcon = "wi-hail";
  else if (weatherId >= 200 && weatherId < 300) weatherIcon = "wi-thunderstorm";
  else weatherIcon = "wi-showers";

  return (
    <FlexContainer>
      <Icon className={`wi ${weatherIcon}`} />
      <WeatherInfoContainer>
        <ContentText>
          <i className="material-icons">location_on</i>
          {props.weather.name}
        </ContentText>
        <Temperature>
          {KetoCe(props.weather.main.temp)}
          <RegularSpan>℃</RegularSpan>
        </Temperature>
        <ContentText>
          <Red>{KetoCe(props.forecast.maxTemp)}℃</Red> /{" "}
          <Blue>{KetoCe(props.forecast.minTemp)}℃</Blue>
        </ContentText>
      </WeatherInfoContainer>
    </FlexContainer>
  );
};

export default WeatherInfo;
