import { useState } from "react";
import styled from "styled-components";

const BoardTypeButtons = ({ setArrival, arrival }) => {
  const [color, setColor] = useState("#141251");

  const buttonActiveHandler = (isTrue, color) => {
    setArrival(isTrue);
    setColor(color);
  };

  return (
    <TypeButtonContainer>
      <TypeButton
        style={
          arrival
            ? {
                backgroundColor: color,
                outline: "2px solid #141251",
                color: "#fff",
              }
            : {
                background: "none",
                outline: "2px solid #141251",
                color: "#141251",
              }
        }
        onClick={() => buttonActiveHandler(true, "#141251")}
      >
        Arrivals
      </TypeButton>
      <TypeButton
        style={
          !arrival
            ? {
                backgroundColor: color,
                outline: "2px solid #141251",
                color: "#fff",
              }
            : {
                background: "none",
                color: "#141251",
                outline: "2px solid #141251",
              }
        }
        onClick={() => buttonActiveHandler(false, "#141251")}
      >
        Departures
      </TypeButton>
    </TypeButtonContainer>
  );
};

export default BoardTypeButtons;

const TypeButtonContainer = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  width: 95%;
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const TypeButton = styled.button`
  width: 10rem;
  height: 2rem;
  border-radius: 1rem;
  border: #141251;
  font-weight: 600;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  &:hover {
    cursor: pointer;
  }
`;
