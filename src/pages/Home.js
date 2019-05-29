import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { weatherApis } from "../api";

import WeatherInfo from "../components/WeatherInfo";
import { async, promised } from "q";

const Container = styled.div`
  text-align: center;
`;

const Title = styled.div`
  width: fit-content;
  font-size: 2.5rem;
  font-weight: 300;
  margin: 5rem auto;
`;

const Home = () => {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState({
    minTemp: 0,
    maxTemp: 0
  });
  const [loading, setLoading] = useState(true);

  const getCurrentWeather = async position => {
    let lon = position.coords.longitude;
    let lat = position.coords.latitude;
    try {
      let [{ data: main }, { data }] = await Promise.all([
        weatherApis.currentWeather(lon, lat),
        weatherApis.weatherForecast(lon, lat, 6)
      ]);
      setWeather(main);
      const templist = [];
      data.list.forEach(result => {
        templist.push(result.main.temp);
      });
      setForecast({
        minTemp: Math.min(...templist),
        maxTemp: Math.max(...templist)
      });
    } catch (error) {
      console.log(`error: ${error}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(getCurrentWeather, error =>
      console.log(error)
    );
  }, []);

  return (
    <Container>
      <Title>👖👚오늘 뭐 입지?</Title>
      {!loading ? <WeatherInfo weather={weather} forecast={forecast} /> : <></>}
    </Container>
  );
};

export default Home;
