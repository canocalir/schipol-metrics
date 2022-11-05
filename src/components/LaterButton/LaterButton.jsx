import { TfiAngleDoubleDown } from "react-icons/tfi";
import styled from "styled-components";
import Loading from "../Loading/Loading";


const LaterButton = ({nextPageFetchData, loading}) => {
  return (
    <ButtonContainer>
      <Button rel="next" onClick={nextPageFetchData}>
      <TfiAngleDoubleDown />
        Show Later Flights
      </Button>
      {loading ? <Loading/> : null}
    </ButtonContainer>
  );
};

export default LaterButton;


const Button = styled.button`
  z-index: 2;
  width: 80vw;
  height: 3.3rem;
  border-radius: 1rem;
  border: none;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 7rem;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 600;
  gap: 0.2rem;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
`;