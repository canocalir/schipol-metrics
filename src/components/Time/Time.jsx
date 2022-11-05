import { useEffect, useState } from "react";
import { ImClock } from "react-icons/im";
import styled from "styled-components";

const Time = () => {
  const [time, setTime] = useState({
    hours: '',
    minutes: '',
    seconds: '',
  });

  useEffect(() => {
    const setTimeHandler = () => {
      setTime({
        hours: String(new Date().getHours()).padStart(2, "0"),
        minutes: String(new Date().getMinutes()).padStart(2, "0"),
        seconds: String(new Date().getSeconds()).padStart(2, "0"),
      });
    }
    setTimeHandler()
    let interval = setInterval(() => {
      setTimeHandler()
    }, 1000);
    clearInterval(interval)
  },[time])

  return (
    <Clock>
      <ImClock/>{time.hours}:{time.minutes}:{time.seconds}
    </Clock>
  );
};

export default Time;

const Clock = styled.h2`
  font-size: 2rem;
  margin: 0;
  color: #141251;
  border-radius: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
`;
