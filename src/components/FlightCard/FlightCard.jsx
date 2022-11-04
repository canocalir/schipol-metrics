import styled from "styled-components";

const FlightCard = ({ flight, arrival }) => {
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
    expectedTimeBoarding,
    actualOffBlockTime,
    publicFlightState,
    terminal,
    gate,
    aircraftType: { iataMain },
  } = flight;

  return (
    <CardContainer key={id}>
      <DetailItemContainer>
        <p>Flight State</p>
        <h2>{publicFlightState?.flightStates[0]}</h2>
      </DetailItemContainer>
      <DetailItemContainer>
        <p>{arrival ? "Coming From" : "Going To"}</p>
        <h2>{route?.destinations}</h2>
      </DetailItemContainer>
      <DetailItemContainer>
        <p>Scheduled</p>
        <h2>{scheduleTime}</h2>
      </DetailItemContainer>
      <DetailItemContainer>
        {arrival ? <p>Actual Landing Time</p> : <p>Expected Take-off Time</p>}
        <h2>
          {arrival
            ? actualLandingTime?.split(/[T,.]/)[1] || "Waiting for Update"
            : actualOffBlockTime?.split(/[T,.]/)[1] || "Waiting for Update"}
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
            ? estimatedLandingTime?.split(/[T,.]/)[1] || "Waiting for Update"
            : expectedTimeBoarding?.split(/[T,.]/)[1] || "Waiting for Update"}
        </h2>
      </DetailItemContainer>
      <DetailItemContainer>
        <p>Flight Name</p>
        <h2>{flightName}</h2>
      </DetailItemContainer>
      <DetailItemContainer>
        <p>Terminal</p>
        <h2>{terminal || "No info"}</h2>
      </DetailItemContainer>
      <DetailItemContainer>
        <p>{arrival ? "Baggage Belt" : "Gate"}</p>
        <h2>
          {!arrival
            ? gate || "No info"
            : baggageClaim?.belts.map((belt) => belt) || "No info"}
        </h2>
      </DetailItemContainer>
      <DetailItemContainer>
        <p>Aircraft: </p>
        <h2>{iataMain}</h2>
      </DetailItemContainer>
    </CardContainer>
  );
};

export default FlightCard;

const DetailItemContainer = styled.div`
  border-left: 0.0625rem dashed #c0becc;
  border-width: 0 0.0625rem;
  margin-right: 1.25rem;
  padding: 0.5rem 1.25rem 0;
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
    cursor: pointer;
  }
`;
