import styled from "styled-components";
import { TfiAngleDoubleUp } from "react-icons/tfi";

const EarlierButton = ({ page, prevPageFetchData }) => {
  return (
    <ButtonContainer>
      <Button
        disabled={page === 0}
        onClick={page > 0 ? prevPageFetchData : null}
      >
        <TfiAngleDoubleUp />
        Earlier
      </Button>
    </ButtonContainer>
  );
};

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
  margin-top: 1rem;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
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

export default EarlierButton;
