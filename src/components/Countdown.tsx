import { useEffect, useState } from "react";
import styled from "styled-components";
import { Button } from "../app/styles";

interface CountdownProps {
  setViewState: (viewState: number) => void;
}

// Countdown is a timer that counts down from 5 to 0. When it reaches 0, it changes the viewState to FEED.
export default function Countdown({ setViewState }: CountdownProps) {
  const [remainingTime, setRemainingTime] = useState(5);
  const [countdownActive, setCountdownActive] = useState(false);

  const VIEW_STATES = { HOME: 0, FEED: 1 };

  useEffect(() => {
    let interval: string | number | NodeJS.Timeout | undefined;

    if (countdownActive && remainingTime > 1) {
      interval = setInterval(() => {
        setRemainingTime((prevRemainingTime) => prevRemainingTime - 1);
      }, 1000);
      setTimeout(() => {
        setViewState(VIEW_STATES.FEED);
      }, 5000);
    } else if (remainingTime === 1) {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [VIEW_STATES.FEED, countdownActive, remainingTime, setViewState]);

  const handleStartClick = () => {
    setCountdownActive(true);
  };

  const handleStopClick = () => {
    setCountdownActive(false);
  };

  return (
    <CountdownWrapper>
      <h2>Start the album in: {remainingTime} seconds</h2>
      {!countdownActive ? (
        <Button onClick={handleStartClick}>Start</Button>
      ) : (
        <Button onClick={handleStopClick}>Stop</Button>
      )}
    </CountdownWrapper>
  );
}

const CountdownWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  color: hsl(358deg 99% 44% /0.3);
  font-size: 1rem;
  text-shadow: 0.5px 0.5px 1px black;
  padding: 1rem;
`;
