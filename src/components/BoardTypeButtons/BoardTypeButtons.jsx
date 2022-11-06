import {useState} from "react";
import styled from "styled-components";

const defaultButtonBg = "#141251"

const defaultButtonStyle = {
  outline: "2px solid #141251",
  color: defaultButtonBg,
}

const BoardTypeButtons = ({ setArrival, arrival }) => {
  const [color, setColor] = useState(defaultButtonBg);
  
  const buttonActiveHandler = (isTrue, color) => {
    setArrival(isTrue);
    setColor(color);
  };
  
  const conditionalStyle = {
    ...defaultButtonStyle,
    color: '#fff',
    backgroundColor: color,
  }
  
  return (
    <TypeButtonContainer>
      <TypeButton
        style={arrival ? conditionalStyle : defaultButtonStyle}
        onClick={() => buttonActiveHandler(true, defaultButtonBg)}
      >
        Arrivals
      </TypeButton>
      <TypeButton
        style={!arrival ? conditionalStyle : defaultButtonStyle}
        onClick={() => buttonActiveHandler(false, defaultButtonBg)}
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
