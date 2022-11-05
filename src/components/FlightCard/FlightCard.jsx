import { useEffect, useState } from "react";
import styled from "styled-components";
import cities from "../../cities.json";
import {
  GiAirplaneArrival,
  GiAirplaneDeparture,
  GiCancel,
  GiCommercialAirplane,
} from "react-icons/gi";
import {RiCalendarCheckFill, RiFlightLandLine } from 'react-icons/ri'
import {MdLuggage} from 'react-icons/md'

const FlightCard = ({ flight, arrival }) => {
  const [convertedCity, setConvertedCity] = useState("");

  const {
    id,
    actualLandingTime,
    estimatedLandingTime,
    flightName,
    flightNumber,
    route,
    scheduleTime,
    scheduleDate,
    baggageClaim,
    expectedSecurityFilter,
    aircraftRegistration,
    airlineCode,
    expectedTimeBoarding,
    actualOffBlockTime,
    publicFlightState,
    terminal,
    gate,
    aircraftType: { iataMain },
  } = flight;

  let flightStatus = "";

  switch (publicFlightState?.flightStates[0]) {
    case "FIR":
      flightStatus = "Approaching";
      break;
    case "SCH":
      flightStatus = "On Time";
      break;
    case "AIR":
      flightStatus = "On Air";
      break;
    case "EXP":
      flightStatus = "Landing";
      break;
    case "LND":
      flightStatus = "Landed";
      break;
    case "FIB":
      flightStatus = "Baggage Soon";
      break;
    case "ARR":
      flightStatus = "Completed";
      break;
    case "DIV":
      flightStatus = "Diverted";
      break;
    case "CNX":
      flightStatus = "Canceled";
      break;
    case "TOM":
      flightStatus = "Tomorrow";
      break;
    case "DEL":
      flightStatus = "Delayed";
      break;
    case "WIL":
      flightStatus = "Wait in Lounge";
      break;
    case "GTO":
      flightStatus = "Gate Open";
      break;
    case "GCL":
      flightStatus = "Gate Closing";
      break;
    case "GTD":
      flightStatus = "Gate Closed";
      break;
    case "DEP":
      flightStatus = "Departed";
      break;
    case "GCH":
      flightStatus = "Gate Change";
      break;
    default:
      flightStatus = "No Info Yet";
      break;
  }

  const countryConverter = (code) => {
    setConvertedCity(
      cities.filter((city) => {
        return city?.code === code;
      })
    );
  };

  useEffect(() => {
    countryConverter(route?.destinations[0]);
  }, []);

  let style;
  let styleIcon;
  switch (flightStatus) {
    case "Canceled":
      style = { backgroundColor: "#f7b7b2ff" };
      styleIcon = <GiCancel />;
      break;
    case "Landed":
      style = { backgroundColor: "#b8f7a8" };
      styleIcon = <RiFlightLandLine/>
      break;
    case "On Air":
      style = { backgroundColor: "#abd0f1" };
      styleIcon = <GiCommercialAirplane />;
      break;
    case "On Time":
      style = { backgroundColor: "#b8f7a8" };
      styleIcon = <RiCalendarCheckFill />;
      break;
    case "Approaching":
      style = { backgroundColor: "#f7e0a4" };
      styleIcon = <GiAirplaneArrival />;
      break;
    case "Departed":
      style = { backgroundColor: "#f7e0a4" };
      styleIcon = <GiAirplaneDeparture />;
      break;
    default:
      style = { backgroundColor: "#fdc52e" };
  }

  return (
    <CardContainer key={id}>
      <DetailItemContainer style={{ width: "9rem" }}>
        <p>Flight Status</p>
        <StateBadge style={style}>
          {styleIcon}
          {flightStatus}
        </StateBadge>
      </DetailItemContainer>
      <DetailItemContainer style={{ width: "8rem" }}>
        <p>{arrival ? "Coming From" : "Going To"}</p>
        <h2
          style={
            convertedCity[0]?.city.length > 8 ? { fontSize: "1.2rem" } : null
          }
        >
          {convertedCity.length > 0
            ? convertedCity[0]?.city.replace(/\d/g, "")
            : route?.destinations[0]}
        </h2>
      </DetailItemContainer>
      <DetailItemContainer>
        <p>Scheduled</p>
        <h2>{scheduleTime}</h2>
      </DetailItemContainer>
      <DetailItemContainer>
        {arrival ? <p>Actual Landing Time</p> : <p>Expected Take-off Time</p>}
        <h2>
          {arrival
            ? actualLandingTime?.split(/[T,.]/)[1] || "Waiting"
            : actualOffBlockTime?.split(/[T,.]/)[1] || "Waiting"}
        </h2>
      </DetailItemContainer>
      <DetailItemContainer>
        {arrival ? (
          <p>Estimated Landing Time</p>
        ) : (
          <p>Expected Boarding Time</p>
        )}
        <h2>
          {arrival
            ? estimatedLandingTime?.split(/[T,.]/)[1] || "Waiting"
            : expectedTimeBoarding?.split(/[T,.]/)[1] || "Waiting"}
        </h2>
      </DetailItemContainer>
      <DetailItemContainer>
        <p>Flight Name</p>
        <h2>{flightName}</h2>
      </DetailItemContainer>
      <DetailItemContainer>
        <p>Terminal</p>
        <TerminalBadge>{terminal || "-"}</TerminalBadge>
      </DetailItemContainer>
      <DetailItemContainer>
        <p>{arrival ? "Baggage Belt" : "Gate"}</p>
        <BaggageBadge>
          {!arrival
            ? gate || "-"
            : baggageClaim?.belts.map((belt, index) => {
              return ( <div key={index}>{<MdLuggage/>}{belt}</div> )}) || "-"}
        </BaggageBadge>
      </DetailItemContainer>
      <DetailItemContainer>
        <p>Aircraft</p>
        <h2>{iataMain}</h2>
      </DetailItemContainer>
    </CardContainer>
  );
};

export default FlightCard;

const StateBadge = styled.h2`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.5rem;
  height: 1rem;
  border-radius: 1rem;
  font-size: 1rem;
  gap: 0.2rem;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
`;

const TerminalBadge = styled.h2`
  background-color: #141251;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.5rem;
  height: 1rem;
  width: 3rem;
  border-radius: 1rem;
  font-size: 1rem;
  color: #fff;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
`;

const BaggageBadge = styled.h2`
  background-color: #fdc62e;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.5rem;
  height: 1rem;
  width: 3rem;
  border-radius: 1rem;
  font-size: 1rem;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
`;

const DetailItemContainer = styled.div`
  border-left: 0.0625rem dashed #c0becc;
  border-width: 0 0.0625rem;
  padding: 0.5rem 1rem 0;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const CardContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  background-color: #fff;
  box-shadow: 0 0.0125em 0.75rem 0 rgb(20 18 81 / 10%);
  margin-bottom: 0.5rem;
  padding: 1.25rem 1.25rem 1rem;
  position: relative;
  z-index: 0;
  flex-wrap: wrap;
  width: 90vw;
  padding: 2rem;
  gap: 1rem;
  border-radius: 1rem;
  &:hover {
    box-shadow: rgba(0, 0, 0, 0.16) 0px 10px 36px 0px,
      rgba(0, 0, 0, 0.06) 0px 0px 0px 1px;
  }
`;
