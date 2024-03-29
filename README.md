<div align="center">
  <h1>Listening Roulette</h1>
</div>
An app for listening to music with friends. Listening Roulette presents a fun way to get several friends to pick an album of their choice, spin the wheel to decide which one to listen to, then listen together while chatting and commenting on the music.

## Author
- [Brett Eastman](https://github.com/BrettEastman)

## Tech Stack

 **Frontend**
 <br>
![Next.js](https://img.shields.io/static/v1?style=for-the-badge&message=Next.js&color=000000&logo=Next.js&logoColor=FFFFFF&label=)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)![TypeScript](https://img.shields.io/static/v1?style=for-the-badge&message=TypeScript&color=3178C6&logo=TypeScript&logoColor=FFFFFF&label=)
![styled-components](https://img.shields.io/static/v1?style=for-the-badge&message=styled-components&color=DB7093&logo=styled-components&logoColor=FFFFFF&label=)


**Backend**
<br>
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Firebase](https://img.shields.io/badge/Firebase-039BE5?style=for-the-badge&logo=Firebase&logoColor=white)


## Features
* Main view:
  * Displays a form to input your album selection and see other's choices
  * The roulette displays the current album selections
* Feed view:
  * Features a message board where the listening chat takes place
  * Features a ChatGPT-powered chatbot which will give listener the history and influences of a particular artist.

## Preview

<p float="left">
  <img width="80%" alt="Listening Roulette Home Page view" src="https://github.com/BrettEastman/listeningRouletteNext/assets/76603041/af3663ab-3a05-4012-a63a-95495a955ea6"> 
</p>

<p float="left">
  <img width="80%" alt="Listening Roulette Feed Page view" src="https://github.com/BrettEastman/listeningRouletteNext/assets/76603041/e0c11703-0fdb-4cf9-9299-f142b5cc59f8"> 
</p>

## Run Locally
```bash
  git clone https://github.com/BrettEastman/listeningRouletteNext.git
```

#### Go to the project directory
```bash
  cd listeningRouletteNext
```
- Create a `.env.local` file from `example.env` and input your own Firebase and OpenAI API keys and info

#### Install dependencies
```bash
  npm install
```

#### Run the development server:
```bash
  npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
