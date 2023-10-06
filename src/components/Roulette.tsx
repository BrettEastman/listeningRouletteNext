"use client";
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { RouletteProps } from "../types";
import Countdown from "./Countdown";

function getRandomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min)) + min;
}

// Roulette is a spinning wheel that displays the top 6 albums from the database
export default function Roulette({ albums, setViewState }: RouletteProps) {
  const [number, setNumber] = useState(0);
  const [spinningStopped, setSpinningStopped] = useState(true);

  useEffect(() => {
    console.log("useEffect albums refresh in Roulette:", albums);
  }, [albums]);

  const btnOnClick = function () {
    setNumber(getRandomInt(3000, 10000));
    setNumber(number + Math.ceil(Math.random() * 10000));
    setTimeout(() => {
      setSpinningStopped(!spinningStopped);
    }, 3001);
  };

  return (
    <ContainerGapCol>
      <Countdown setViewState={setViewState} />
      <div>
        <ContainerCol>
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
        </ContainerCol>
      </div>
      <SpinButton onClick={btnOnClick}>Spin</SpinButton>
    </ContainerGapCol>
  );
}

const RouletteWheel = styled.div`
  .wheel {
    height: 350px;
    width: 350px;
    position: relative;
    border: 0.5px solid white;
    letter-spacing: 1px;
    border-radius: 50%;
    overflow: hidden;
    box-shadow: 0 0 10px hsl(358deg 99% 24% /0.3);
    transition: 3s all;
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
    font-size: 16px;
    transform-origin: bottom;
    color: black;
    writing-mode: vertical-rl;
  }
  .wheel .one {
    background: hsla(204deg 70% 70% / 0.9);
    left: 50%;
  }
  .wheel .two {
    background: hsla(204deg 70% 66% / 0.9);
    transform: rotate(60deg);
  }
  .wheel .three {
    background: hsla(204deg 70% 62% / 0.9);
    transform: rotate(120deg);
  }
  .wheel .four {
    background: hsl(358deg 99% 64% /0.3);
    transform: rotate(180deg);
  }
  .wheel .five {
    background: hsl(358deg 99% 54% /0.3);
    transform: rotate(240deg);
  }
  .wheel .six {
    background: hsl(358deg 99% 44% /0.3);
    transform: rotate(300deg);
  }
`;

const SpinButton = styled.button`
  padding: 1rem;
  border: 0.5px solid white;
  border-radius: 50%;
  background: radial-gradient(
    hsl(358deg 99% 84% /0.3),
    hsl(358deg 99% 64% /0.3)
  );
  letter-spacing: 2px;
  box-shadow: 0 2px 4px hsl(358deg 99% 24% /0.3);
  transform: scale(1.1);
  cursor: pointer;
  transition: 0.2s all;
  :hover {
    box-shadow: none;
    color: hsla(204deg 90% 66% / 0.9);
  }
`;

const Stopper = styled.div`
  height: 20px;
  width: 15px;
  background: #794244;
  clip-path: polygon(100% 0, 50% 100%, 0 0);
`;

const ContainerCol = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
`;

const ContainerGapCol = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  gap: 1rem;
`;
