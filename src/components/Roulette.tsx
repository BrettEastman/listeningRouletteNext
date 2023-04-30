'use client'
import { useState } from 'react';
import styled from 'styled-components';
import AddMessage from './AddMessage';
import { AlbumEntry } from './types';

interface RouletteProps {
  albums: AlbumEntry[];
  viewState: number;
  setViewState: any;
  currentUser: string;
  handleMessage: any;
}
function getRandomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min)) + min;
}

export default function Roulette({ albums, viewState, setViewState, currentUser, handleMessage }: RouletteProps) {
  const [ number, setNumber ] = useState(0);
  const [ spinningStopped, setSpinningStopped ] = useState(true)

  const btnOnClick = function () {
    setNumber(getRandomInt(3000, 10000));
    setNumber(number + Math.ceil(Math.random() * 10000));
    setTimeout(() => {
      setSpinningStopped(!spinningStopped);
    }, 3001)
    setTimeout(() => {
      setViewState(1);
    }, 4000)
  };

  return (
    <Container>
      <div className="container" style={{ transform: `rotate(${number}deg)`}}>
        <div className="one">{albums[0]?.album}</div>
        <div className="two">{albums[1]?.album}</div>
        <div className="three">{albums[2]?.album}</div>
        <div className="four">{albums[3]?.album}</div>
        <div className="five">{albums[4]?.album}</div>
        <div className="six">{albums[5]?.album}</div>
      </div>
      {viewState === 0 && (<button
        id="button" onClick={() => {
          btnOnClick();
        }}>Spin</button>)}
      {viewState === 1 && (<button id="button" onClick={() => setViewState(0)}>Home</button>)}
      <div className="stopper"></div>
      <div>
        {viewState === 1 && (<Message><AddMessage currentUser={currentUser} handleMessage={handleMessage}/></Message>)}
      </div>
    </Container>
  );
}

const Container = styled.div`
  .container {
    height: 350px;
    width: 350px;
    position: relative;
    border-radius: 50%;
    overflow: hidden;
    box-shadow: 0 0 10px hsl(358deg 99% 24% /.3);
    transition: 3s all;
    border: 1px solid black;
  }
  .container div {
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
    font-family: inherit;
    font-weight: 1000;
    transform-origin: bottom;
    color: black;
    writing-mode: vertical-rl;
  }
  .container .one {
    background: hsla(204deg 70% 70% / .9);
    left: 50%;
  }
  .container .two {
    background: hsla(204deg 70% 66% / .9);
    transform: rotate(60deg);
  }
  .container .three {
    background: hsla(204deg 70% 62% / .9);
    transform: rotate(120deg);
  }
  .container .four {
    background: hsl(358deg 99% 64% /.3);
    transform: rotate(180deg);
  }
  .container .five {
    background: hsl(358deg 99% 54% /.3);
    transform: rotate(240deg);
  }
  .container .six {
    background: hsl(358deg 99% 44% /.3);
    transform: rotate(300deg);
  }

  #button {
    height: 20px;
    width: 60px;
    background: hsl(358deg 99% 44% /.3);
    position: absolute;
    margin-top: 20px;
    margin-left: 147px;
    font-size: 10px;
    color: black;
    font-weight: 1000;
    letter-spacing: 3px;
    text-shadow: 0.5px 0.5px hsla(204deg 70% 66% / .9);
    border: 0.5px solid black;
    border-radius: 6px;
    cursor: pointer;
    box-shadow: 0 5px 10px hsl(358deg 99% 24% /.3);
    transition: 0.2s all;
    transform: scale(1.5);
  }
  #button:hover {
    box-shadow: none;
    color: hsla(204deg 90% 66% / .9);
  }
  .stopper {
    height: 20px;
    width: 15px;
    background: hsl(358deg 99% 64% /.3);
    position: absolute;
    clip-path: polygon(100% 0, 50% 100%, 0 0);
    margin-top: -370px;
    margin-left: 165px;
  }
`;

const Message = styled.div`
  margin-top: 80px;
`;
