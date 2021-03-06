import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { weatherApis, kakaoApis, airKoreaApis } from "../api";

import WeatherInfo from "../components/WeatherInfo";
import Clothing from "../components/Clothing";
import Spinner from "../components/Spinner";

const Container = styled.div`
  text-align: center;
`;

const ContentContainer = styled.div`
  margin-top: 3rem;
  @media (min-width: 1080px) {
    display: flex;
    justify-content: center
    align-items: center;
    margin-top: 0
  }
`;

const Line = styled.div`
  height: 2.5rem;
  @media (min-width: 1080px) {
    margin: 0 60px;
    height: 200px;
    border-left: 1.2px solid #9a9a9a;
  }
`;

const Title = styled.div`
  width: fit-content;
  font-size: 2.5rem;
  font-weight: 300;
  margin: 5rem auto;
`;

const StyledLink = styled.a`
  font-size: 0.8rem;
  text-decoration: none;
  color: #6d6d6d;
`;

const LinkContainer = styled.div`
  margin-top: 7rem;
  @media (min-width: 1080px) {
    margin-top: 15rem;
  }
`;

const Home = () => {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState({
    minTemp: 0,
    maxTemp: 0,
    rain: false
  });
  const [location, setLocation] = useState("서울시");
  const [loading, setLoading] = useState(true);

  const getCurrentWeather = async (lon, lat) => {
    let rainy = false;
    let [{ data: main }, { data }] = await Promise.all([
      weatherApis.currentWeather(lon, lat),
      weatherApis.weatherForecast(lon, lat, 6)
    ]);
    setWeather(main);
    const templist = [];
    data.list.forEach(result => {
      templist.push(result.main.temp);
      if (result.weather.id >= 200 && result.weather.id < 600) rainy = true;
    });
    setForecast({
      minTemp: Math.min(...templist),
      maxTemp: Math.max(...templist),
      rain: rainy
    });
  };

  const getTM = async (lon, lat) => {
    let { data } = await kakaoApis.geoCode(lon, lat);
    let temp_location = data.documents[0].address_name.split(" ");
    setLocation(temp_location[temp_location.length - 1]);
    let x = data.documents[0].x;
    let y = data.documents[0].y;
    let result = await airKoreaApis.findNearStation(x, y);
    console.log("result: " + result);
  };

  const successHandler = async position => {
    let lon = position.coords.longitude;
    let lat = position.coords.latitude;
    try {
      getCurrentWeather(lon, lat);
      getTM(lon, lat);
    } catch (error) {
      console.log(`error: ${error}`);
    } finally {
      setLoading(false);
    }
  };

  const errorHandler = async error => {
    console.log(error);
    setLoading(false);
    try {
      await getCurrentWeather(126.97, 37.56);
    } catch (error) {
      console.log(`error: ${error}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(successHandler, errorHandler, {
      timeout: 10000
    });
  }, []);

  let info;
  if (!loading) {
    if (!weather) info = <div>위치정보를 불러오지 못했습니다</div>;
    else {
      info = (
        <ContentContainer>
          <WeatherInfo
            weather={weather}
            forecast={forecast}
            location={location}
          />
          {}
          <Line />
          <Clothing weather={weather} forecast={forecast} />
        </ContentContainer>
      );
    }
  } else {
    info = <Spinner />;
  }

  let url = "http://m.cafe.daum.net/ok1221/8foR/52858520/comments";
  if (window.screen.width >= 1080) {
    url = "http://cafe.daum.net/ok1221/8foR/52858520";
  }

  return (
    <Container>
      <Title>👖👚오늘 뭐 입지?</Title>
      {info}
      <LinkContainer>
        <StyledLink href={url}>👉🏻오늘 뭐 입지? 달글</StyledLink>
      </LinkContainer>
    </Container>
  );
};

export default Home;
