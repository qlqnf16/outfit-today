import React from "react";
import styled from "styled-components";

const Container = styled.div``;

const MainContent = styled.div`
  font-size: 1.6rem;
  font-weight: 700;
  @media (min-width: 1080px) {
    font-size: 2rem;
  }
`;

const Content = styled.div`
  margin-top: 1rem;
`;

const Clothing = props => {
  let rainy = false;
  let rainyForecast = false;
  let rainyContent;

  props.weather.weather.forEach(weather => {
    if (weather.id >= 200 && weather.id < 600) {
      rainy = true;
    }
  });
  if (props.forecast.rain) rainyForecast = true;

  if (rainy) rainyContent = "비가 내려요, 우산을 챙기세요!";
  else if (rainyForecast) rainyContent = "비 예보가 있어요, 우산을 챙기세요!";

  const current_temp = props.weather.main.temp - 273.15;
  let clothing;
  if (current_temp >= 28) clothing = `나시티, 반바지`;
  else if (current_temp >= 23 && current_temp < 28)
    clothing = `반팔, 얇은 셔츠, 얇은 긴팔`;
  else if (current_temp >= 20 && current_temp < 23)
    clothing = `긴팔, 가디건, 후드티`;
  else if (current_temp >= 17 && current_temp < 20)
    clothing = `가디건, 니트, 맨투맨, 후드티`;
  else if (current_temp >= 12 && current_temp < 17)
    clothing = `셔츠, 자켓, 간절기 야상`;
  else if (current_temp >= 10 && current_temp < 12)
    clothing = `트렌치코트, 간절기 야상, 자켓 안에 가디건 필수`;
  else if (current_temp >= 6 && current_temp < 10) clothing = `코트, 가죽자켓`;
  else clothing = `겨울 야상, 패딩, 목도리 등`;

  const minTemp = parseInt((props.forecast.minTemp - 273.15).toFixed(0));
  let minTempComment;
  if (minTemp < 20 && minTemp > 15) minTempComment = `가디건`;
  else if (minTemp <= 15 && minTemp > 6) minTempComment = `자켓`;
  else if (minTemp <= 6) minTempComment = `패딩`;

  return (
    <Container>
      <MainContent>{clothing}</MainContent>
      <Content>
        <div>
          {minTemp < 20
            ? `최저기온 ${minTemp}℃! <b>{minTempComment}</b>을 챙기세요`
            : ``}
        </div>
        <div>{rainyContent}</div>
      </Content>
    </Container>
  );
};

export default Clothing;
