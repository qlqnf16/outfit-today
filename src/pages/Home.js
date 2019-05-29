import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { weatherApis } from "../api";

import WeatherInfo from "../components/WeatherInfo";

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

  const getCurrentWeather = async () => {
    try {
      const { data: main } = await weatherApis.currentWeather("Seoul");
      setWeather(main);

      const { data } = await weatherApis.weatherForecast("Seoul", 6);
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
    getCurrentWeather();
  }, []);

  return (
    <div>
      <Title>👖👚오늘 뭐 입지?</Title>
      {!loading ? <WeatherInfo weather={weather} forecast={forecast} /> : <></>}
    </div>
  );
};

export default Home;
