"use client";
import { AlbumEntry, Message } from "@/components/types";
import { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import addData from "@/firebase/firestore/addData";
import GlobalStyles from "../../GlobalStyles.js";
import AlbumList from "../../components/AlbumList";
import Form from "../../components/form/Form";
import Feed from "../../components/Feed";
import Roulette from "../../components/Roulette";
import SignOutOfApp from "../../firebase/auth/signout.js";

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [albums, setAlbums] = useState<AlbumEntry[]>([]);
  const [viewState, setViewState] = useState(0);
  const [currentUser, setCurrentUser] = useState("Sean");
  const [timeToSpin, setTimeToSpin] = useState(false);

  // this is the function added later to show how one might use addData
  const handleForm = async () => {
    const data = {
      name: "John snow",
      house: "Stark",
    };
    const { result, error } = await addData("users", "user-id", data);

    if (error) {
      return console.log(error);
    }
  };

  interface AlbumInfo {
    name: string;
    album: string;
  }

  const getAll = () => {
    return axios.get("/lr");
  };

  const getAllMessages = () => {
    return axios.get("/messages");
  };

  const fetchAll = () => {
    getAll()
      .then(({ data }) => {
        setAlbums(data);
      })
      .catch((error) => {
        console.error("fetch error: ", error);
      });
  };

  const fetchAllMessages = () => {
    getAllMessages()
      .then(({ data }) => {
        setMessages(data);
      })
      .catch((error) => {
        console.error("fetch error: ", error);
      });
  };

  useEffect(() => {
    fetchAll();
    fetchAllMessages();
  }, []);

  const handleAlbum = (obj: AlbumInfo) => {
    axios({
      method: "post",
      url: "/lr",
      data: obj,
    })
      .then((response) => {
        fetchAll();
      })
      .catch((error) => {
        console.error("post error: ", error);
      });
  };

  const handleMessage = (obj: AlbumInfo) => {
    axios({
      method: "post",
      url: "/messages",
      data: obj,
    })
      .then((response) => {
        fetchAllMessages();
      })
      .catch((error) => {
        console.error("message error: ", error);
      });
  };

  const handleSubmit = (data: AlbumInfo) => {
    if (Object.keys(albums).length >= 5) {
      handleAlbum(data);
      setTimeToSpin(true);
    } else {
      handleAlbum(data);
    }
  };

  return (
    <div>
      <GlobalStyles />
      <Title>Listening Roulette</Title>
      <Container>
        {viewState === 0 && timeToSpin === true && (
          <div>
            <Spin>Time to Spin!</Spin>
            <AlbumList albums={albums} />
          </div>
        )}
        {viewState === 0 && timeToSpin === false && (
          <div>
            <Form handleSubmit={handleSubmit} />
            <AlbumList albums={albums} />
          </div>
        )}
        {viewState === 1 && (
          <FeedWrapper>
            <Feed messages={messages} />
          </FeedWrapper>
        )}
        <RouletteWrapper>
          <Roulette
            albums={albums}
            viewState={viewState}
            setViewState={setViewState}
            currentUser={currentUser}
            handleMessage={handleMessage}
          />
        </RouletteWrapper>
      </Container>
      <button onClick={() => SignOutOfApp()}>Sign Out</button>
    </div>
  );
}

const Title = styled.h1`
  font-family: "Cedarville Cursive", cursive;
  color: #f02127;
  opacity: 0.8;
  font-size: 5rem;
  text-shadow: 1px 1px 2px black;
  padding-bottom: 4rem;
  margin-left: 1.5rem;
`;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  font-family: inherit;
`;

const FeedWrapper = styled.div`
  max-height: 36rem;
  overflow-y: auto;
`;

const RouletteWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;

const Spin = styled.div`
  font-size: 1.8rem;
  text-shadow: 0.5px 0.5px hsla(204deg 70% 76% / 0.9);
  padding: 1.5rem;
  margin: 0.5rem;
  margin-top: 2.2rem;
  margin-bottom: 3rem;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  background: radial-gradient(
    hsl(358deg 99% 84% /0.3),
    hsl(358deg 99% 64% /0.3)
  );
  box-shadow: 0 2px 4px hsl(358deg 99% 24% /0.3);
  transform: scale(1.1);
`;
