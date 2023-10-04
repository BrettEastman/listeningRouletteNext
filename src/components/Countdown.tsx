import React, { useState, useEffect } from "react";
import { Button, FormWrapper } from "../app/styles";

export default function StartCountdown() {
  const [remainingTime, setRemainingTime] = useState(5);
  const [countdownActive, setCountdownActive] = useState(false);

  useEffect(() => {
    let interval;

    if (countdownActive && remainingTime > 0) {
      interval = setInterval(() => {
        setRemainingTime((prevRemainingTime) => prevRemainingTime - 1);
      }, 1000);
    } else if (remainingTime === 0) {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [countdownActive, remainingTime]);

  const handleStartClick = () => {
    setCountdownActive(true);
  };

  const handleStopClick = () => {
    setCountdownActive(false);
  };

  return (
    <FormWrapper>
      <h2>Start the album in: {remainingTime} seconds</h2>
      {!countdownActive ? (
        <Button onClick={handleStartClick}>Start</Button>
      ) : (
        <Button onClick={handleStopClick}>Stop</Button>
      )}
    </FormWrapper>
  );
}
