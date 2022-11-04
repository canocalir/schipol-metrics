import { useEffect, useState } from "react";
import styled from "styled-components";
import Board from "./components/Board/Board";
import BoardTypeButtons from "./components/BoardTypeButtons/BoardTypeButtons";
import EarlierButton from "./components/EarlierButton/EarlierButton";
import LaterButton from "./components/LaterButton/LaterButton";
import ScrollButton from "./components/ScrollButton/ScrollButton";
import flag from './assets/dutchflag.png'

const App = () => {
  const [dataArrival, setDataArrival] = useState([]);
  const [dataDeparture, setDataDeparture] = useState([]);
  const [page, setPage] = useState(0);
  const [arrival, setArrival] = useState(true);
  const [loading, setLoading] = useState(false);
  const [time, setTime] = useState({
    hours: String(new Date().getHours() - 2).padStart(2, "0"),
    minutes: String(new Date().getMinutes()).padStart(2, "0"),
    seconds: String(new Date().getSeconds()).padStart(2, "0"),
  });
  const [airportData, setAirportData] = useState([]);

  const addDays = (date, days) => {
    const copy = new Date(Number(date));
    copy.setDate(date.getDate() + days);
    return copy;
  };

  let date = new Date();
  date.setHours(date.getHours() + 2);
  date.setMinutes(date.getMinutes() + 50);
  date = new Date(date);

  let dateData = new Date();
  const dateNow = date;
  const dateTomorrow = addDays(dateData, 1);

  const amsTimeNow = new Date(
    dateNow?.toLocaleString("en-US", { timeZone: "Europe/Amsterdam" })
  );
  const amsTimeTomorrow = new Date(
    dateTomorrow.toLocaleString("en-US", { timeZone: "Europe/Amsterdam" })
  );

  const day = String(date.getDate()).padStart(2, "0");
  const month = +String(date.getMonth() + 1).padStart(2, "0");
  const year = +String(date.getFullYear()).padStart(2, "0");

  const fetchAirportStatistics = async () => {
    const url = `https://aerodatabox.p.rapidapi.com/airports/icao/EHAM/delays/2022-06-03T12:00/2022-06-04T00:00`;

    const res = await fetch(url, {
      headers: {
        "X-RapidAPI-Key": "00d5212dd3msh0014f21a2ef2e81p12823djsn2865f7fe8644",
        "X-RapidAPI-Host": "aerodatabox.p.rapidapi.com",
      },
    });
    const data = await res.json();
    setAirportData(data);
  };

  const fetchData = async () => {
    const jsonDateNow = amsTimeNow.toJSON().split(".")[0];
    const jsonDateTomorrow = amsTimeTomorrow.toJSON().split(".")[0];

    setLoading(true);
    const url = `/flights?flightDirection=${
      arrival ? "A" : "D"
    }&fromDateTime=${jsonDateNow}&toDateTime=${jsonDateTomorrow}&searchDateTimeField=scheduleDateTime&page=${page}&sort=+scheduleDate, +scheduleTime`;
    const res = await fetch(url, {
      headers: {
        Accept: "application/json",
        app_id: "70a4b529",
        app_key: "666da711da06382751060e6ededa9382",
        ResourceVersion: "v4",
      },
    });
    const data = await res.json();
    arrival ? setDataArrival(data?.flights) : setDataDeparture(data?.flights);
    setTimeout(() => {
      setLoading(false);
    }, 700);
  };

  const nextPageFetchData = () => {
    setPage((current) => current + 1);
  };

  const prevPageFetchData = () => {
    setPage((current) => current - 1);
  };

  useEffect(() => {
    fetchData();
    fetchAirportStatistics();
    setInterval(() => {
      setTime({
        hours: String(new Date().getHours() - 2).padStart(2, "0"),
        minutes: String(new Date().getMinutes()).padStart(2, "0"),
        seconds: String(new Date().getSeconds()).padStart(2, "0"),
      });
    }, 1000);
  }, [page, arrival]);

  return (
    <MainContainer>
      <DateContainer>
        <DateView>
          {day}.{month}.{year}
        </DateView>
        <TitleContainer>
        <FlagImage src={flag} />
        <MainTitle>Schipol Airport Flights</MainTitle>
        </TitleContainer>
        <Clock>
          {time.hours}:{time.minutes}:{time.seconds}
        </Clock>
      </DateContainer>
      <BoardTypeButtons arrival={arrival} setArrival={setArrival} />
      <EarlierButton prevPageFetchData={prevPageFetchData} page={page} />
      {arrival ? (
        <Board loading={loading} arrival={arrival} data={dataArrival} />
      ) : (
        <Board data={dataDeparture} />
      )}
      <LaterButton nextPageFetchData={nextPageFetchData} page={page} />
      <ScrollButton />
    </MainContainer>
  );
};

const FlagImage = styled.img`
  height: 50px;
`

const Clock = styled.h2`
  font-size: 2rem;
  margin: 0;
  color: #141251;
  border-radius: 1rem;
`;

const DateView = styled.h2`
  font-size: 2rem;
  margin: 0;
  outline-offset: 0.8rem;
  border-radius: 1rem;
  color: #141251;

`;

const DateContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
  justify-content: space-evenly;
  width: 94%;
  padding: 1rem;
  flex-wrap: wrap;

  background-color: #fff;
  border-radius: 1rem;
  margin-bottom: 1rem;
`;

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
  gap: 1rem;
`;

const MainTitle = styled.h1`
  display: block;
  font-size: 2rem;
  line-height: 1.069;
  max-width: 26.875rem;
  color: #141251;
`;

const TitleContainer = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
`

export default App;
