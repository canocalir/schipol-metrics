import styled from "styled-components";
import FlightCard from "../FlightCard/FlightCard";
import Loading from "../Loading/Loading";

const Board = ({ data, arrival, loading }) => {
  return (
    <BoardContainer>
      {loading ? (
        <Loading />
      ) : (
        data.map((flight, id) => {
          return (
            <div key={id}>
              <FlightCard arrival={arrival} flight={flight} />
            </div>
          );
        })
      )}
    </BoardContainer>
  );
};

export default Board;

const BoardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  align-items: center;
  padding-top: 2rem;
  gap: 2rem;
`;
