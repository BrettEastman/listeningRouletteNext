import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { Button } from "../app/styles";

// Countdown is a timer that counts down from 5 to 0. When it reaches 0, it calls router.push('/feed').
export default function Countdown() {
  const [remainingTime, setRemainingTime] = useState(5);
  const [countdownActive, setCountdownActive] = useState(false);
  const router = useRouter();

  useEffect(() => {
    let interval: string | number | NodeJS.Timeout | undefined;

    if (countdownActive && remainingTime > 1) {
      interval = setInterval(() => {
        setRemainingTime((prevRemainingTime) => prevRemainingTime - 1);
      }, 1000);
      setTimeout(() => {
        router.push("/feed");
      }, 5000);
    } else if (remainingTime === 1) {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [countdownActive, remainingTime, router]);

  const handleStartClick = () => {
    setCountdownActive(true);
  };

  const handleStopClick = () => {
    setCountdownActive(false);
  };

  return (
    <CountdownWrapper>
      {!countdownActive ? (
        <Button onClick={handleStartClick}>Start</Button>
      ) : (
        <Button onClick={handleStopClick}>
          <CountStyle>{remainingTime}</CountStyle>
        </Button>
      )}
    </CountdownWrapper>
  );
}

const CountdownWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--spacing-md);
  color: var(--color-text-primary);
  font-size: var(--font-size-base);
  padding: var(--spacing-md);
`;

const CountStyle = styled.div`
  font-size: var(--font-size-3xl);
  color: var(--color-text-inverse);
  font-weight: 600;
  transition: all 0.3s ease;
`;
