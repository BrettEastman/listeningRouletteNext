"use client";
import { useState } from "react";
import styled from "styled-components";
import { Container } from "../app/styles";
import { RouletteProps } from "../types";
import Countdown from "./Countdown";

function getRandomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min)) + min;
}

// Roulette is a spinning wheel that displays the top 6 albums from the database
export default function Roulette({ albums }: RouletteProps) {
  const [number, setNumber] = useState(0);
  const [spinningStopped, setSpinningStopped] = useState(true);

  const btnOnClick = function () {
    setNumber(getRandomInt(3000, 10000));
    setNumber(number + Math.ceil(Math.random() * 10000));
    setTimeout(() => {
      setSpinningStopped(!spinningStopped);
    }, 3001);
  };

  return (
    <Container $flexDirection="column">
      <Countdown />
      <div>
        <Container $flexDirection="column" $gap="0rem">
          <Stopper />
          <RouletteWheel>
            <div
              className="wheel"
              style={{ transform: `rotate(${number}deg)` }}
            >
              <div className="one">{albums[0]?.album}</div>
              <div className="two">{albums[1]?.album}</div>
              <div className="three">{albums[2]?.album}</div>
              <div className="four">{albums[3]?.album}</div>
              <div className="five">{albums[4]?.album}</div>
              <div className="six">{albums[5]?.album}</div>
            </div>
          </RouletteWheel>
        </Container>
      </div>
      <SpinButton onClick={btnOnClick}>Spin</SpinButton>
    </Container>
  );
}

const RouletteWheel = styled.div`
  .wheel {
    height: 350px;
    width: 350px;
    position: relative;
    border: 2px solid var(--color-border);
    letter-spacing: 0.025em;
    border-radius: 50%;
    overflow: hidden;
    box-shadow: var(--shadow-lg);
    transition: transform 3s cubic-bezier(0.4, 0, 0.2, 1);
    background: var(--color-surface);
  }
  .wheel div {
    height: 50%;
    width: 200px;
    clip-path: polygon(100% 0, 50% 100%, 0 0);
    transform: translateX(-50%);
    transform-origin: bottom;
    position: absolute;
    left: 21%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: var(--font-size-sm);
    transform-origin: bottom;
    color: var(--color-text-inverse);
    writing-mode: vertical-rl;
    font-weight: 500;
  }
  .wheel .one {
    background: var(--color-primary);
    left: 50%;
  }
  .wheel .two {
    background: var(--color-primary-light);
    transform: rotate(60deg);
  }
  .wheel .three {
    background: var(--color-secondary);
    transform: rotate(120deg);
  }
  .wheel .four {
    background: var(--color-accent);
    transform: rotate(180deg);
  }
  .wheel .five {
    background: var(--color-accent-dark);
    transform: rotate(240deg);
  }
  .wheel .six {
    background: var(--color-primary-dark);
    transform: rotate(300deg);
  }
`;

const SpinButton = styled.button`
  padding: var(--spacing-md) var(--spacing-xl);
  border: 1px solid var(--color-primary);
  border-radius: var(--radius-pill);
  background: var(--color-primary);
  color: var(--color-text-inverse);
  letter-spacing: 0.025em;
  font-weight: 600;
  font-size: var(--font-size-lg);
  box-shadow: var(--shadow-md);
  cursor: pointer;
  transition: all 0.2s ease;
  &:hover {
    background: var(--color-primary-dark);
    border-color: var(--color-primary-dark);
    box-shadow: var(--shadow-lg);
    transform: translateY(-2px);
  }
  &:active {
    transform: translateY(0);
    box-shadow: var(--shadow-md);
  }
  &:focus-visible {
    outline: 2px solid var(--color-primary);
    outline-offset: 2px;
  }
`;

const Stopper = styled.div`
  height: 20px;
  width: 15px;
  background: var(--color-accent);
  clip-path: polygon(100% 0, 50% 100%, 0 0);
  box-shadow: var(--shadow-sm);
`;
