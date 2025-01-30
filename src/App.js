import { useEffect, useState } from "react";
import styled from "styled-components";
import Board from "./components/Board/Board";
import BoardTypeButtons from "./components/BoardTypeButtons/BoardTypeButtons";
import LaterButton from "./components/LaterButton/LaterButton";
import ScrollButton from "./components/ScrollButton/ScrollButton";
import flag from "./assets/dutchflag.png";
import Time from "./components/Time/Time";
import Search from "./components/SearchFilter/SearchFilter";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ImCalendar } from "react-icons/im";

const App = () => {
  const [dataArrival, setDataArrival] = useState([]);
  const [dataDeparture, setDataDeparture] = useState([]);
  const [page, setPage] = useState(0);
  const [arrival, setArrival] = useState(true);
  const [loading, setLoading] = useState(false);
  const [filteredData, setFilteredData] = useState([]);

  const addDays = (date, days) => {
    const copy = new Date(Number(date));
    copy.setDate(date.getDate() + days);
    return copy;
  };

  let date = new Date();
  date.setHours(date.getHours() + 2);
  date.setMinutes(date.getMinutes() + 60);

  let dateData = new Date();
  const dateNow = date;
  const dateTomorrow = addDays(dateData, 1);

  const jsonDateNow = dateNow.toJSON().split(".")[0];
  const jsonDateTomorrow = dateTomorrow.toJSON().split(".")[0];

  const day = String(dateNow.getDate()).padStart(2, "0");
  const month = String(dateNow.getMonth() + 1).padStart(2, "0");

  const year = +String(dateNow.getFullYear()).padStart(2, "0");

  const fetchData = async () => {
    setLoading(true);
    const url = `${process.env.REACT_APP_BASE_URL}/flights?flightDirection=${
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
    arrival
      ? setDataArrival([...dataArrival, ...data?.flights])
      : setDataDeparture([...dataDeparture, ...data?.flights]);
    setTimeout(() => {
      setLoading(false);
    }, 100);
  };

  const nextPageFetchData = () => {
    setPage((current) => current + 1);
  };
/* eslint-disable */
  useEffect(() => {
    fetchData();
  }, [page, arrival]);

  return (
    <MainContainer>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <DateContainer>
        <DateView>
          <ImCalendar />
          {day}.{month}.{year}
        </DateView>
        <TitleContainer>
          <FlagImage src={flag} />
          <MainTitle>Schipol Airport Flights</MainTitle>
        </TitleContainer>
        <Time />
      </DateContainer>
      <MiddleContainer>
        <SearchContainer>
          <BoardTypeButtons arrival={arrival} setArrival={setArrival} />
          <Search
            arrival={arrival}
            setArrival={setArrival}
            filteredData={filteredData}
            setFilteredData={setFilteredData}
            dataArrival={dataArrival}
            dataDeparture={dataDeparture}
          />
        </SearchContainer>
      </MiddleContainer>
      {arrival ? (
        <Board
          arrival={arrival}
          data={dataArrival}
          filteredData={filteredData}
        />
      ) : (
        <Board
          data={dataDeparture}
          filteredData={filteredData}
          arrival={arrival}
        />
      )}
      {!filteredData.length ? (
        <LaterButton
          loading={loading}
          nextPageFetchData={nextPageFetchData}
          page={page}
        />
      ) : null}
      <ScrollButton />
    </MainContainer>
  );
};

const SearchContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const MiddleContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-evenly;
`;

const FlagImage = styled.img`
  height: 50px;
`;

const DateView = styled.h2`
  font-size: 2rem;
  margin: 0;
  outline-offset: 0.8rem;
  border-radius: 1rem;
  color: #141251;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
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
  margin-top: 2rem;
`;

const MainTitle = styled.h1`
  font-size: 2rem;
  line-height: 1.069;
  max-width: 26.875rem;
  color: #141251;
`;

const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  @media (max-width: 768px) {
    flex-direction: column;
    justify-content: center;
  }
`;

export default App;
