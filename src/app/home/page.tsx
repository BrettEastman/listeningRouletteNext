"use client";
import { AlbumEntry, Message } from "../../types.js";
import React, { useState, useEffect } from "react";
import { useAuthContext } from "../../context/AuthContext";
import { useRouter } from "next/navigation";
import styled from "styled-components";
import {
  addData,
  getAlbums,
  getMessages,
} from "../../firebase/firestore/model";
import AlbumList from "../../components/AlbumList";
import Form from "../../components/form/Form";
import Feed from "../../components/Feed";
import Roulette from "../../components/Roulette";
import { signOutOfApp } from "../../firebase/auth/api.js";

export default function Home() {
  enum ViewStates {
    APP = 0,
    FEED = 1,
  }

  const VIEW_STATES = { APP: 0, FEED: 1 };

  const { user } = useAuthContext();

  const [messages, setMessages] = useState<Message[]>([]);
  const [albums, setAlbums] = useState<AlbumEntry[]>([]);
  const [viewState, setViewState] = useState(0);
  const [currentUser, setCurrentUser] = useState("");
  const [currentUserId, setCurrentUserId] = useState("");
  const [timeToSpin, setTimeToSpin] = useState(false);

  const router = useRouter();

  interface AlbumInfo {
    name: string;
    album: string;
  }

  useEffect(() => {
    if (user == null) {
      return router.push("/signin");
    }
    if (user) {
      setCurrentUser(user.email);
      setCurrentUserId(user.uid);
    }
  }, [router, user]);

  const fetchAll = async () => {
    try {
      const { data, error } = await getAlbums();
      if (error) {
        console.error("fetch error: ", error);
      } else {
        setAlbums(data as AlbumEntry[]);
        console.log("albums after fetchAll req:", data);
      }
    } catch (error) {
      console.error("fetch error: ", error);
    }
  };

  const fetchAllMessages = async () => {
    try {
      const { data, error } = await getMessages();
      if (error) {
        console.error("fetch error: ", error);
      } else {
        if (data) {
          setMessages(data as Message[]);
          console.log("messages after fetchAll req:", data);
        }
      }
    } catch (error) {
      console.error("fetch error: ", error);
    }
  };

  useEffect(() => {
    fetchAll();
    fetchAllMessages();
  }, []);

  const handleAlbum = async (obj: AlbumInfo[]) => {
    const { result, error } = await addData("lr", currentUserId, obj);
    if (error) {
      console.log("add album error:", error);
    } else {
      fetchAll();
    }
  };

  const handleMessage = async (obj: AlbumInfo[]) => {
    const { result, error } = await addData("messages", currentUserId, obj);
    if (error) {
      console.log("handle message error:", error);
    } else {
      fetchAllMessages();
    }
  };

  const handleSubmit = (data: AlbumInfo[]) => {
    if (Object.keys(albums).length >= 5) {
      handleAlbum(data);
      setTimeToSpin(true);
    } else {
      handleAlbum(data);
    }
  };

  const signOutOfAppButton = () => {
    signOutOfApp();
    router.push("/signin");
  };

  return (
    <div>
      <Title>Listening Roulette</Title>
      <Container>
        {viewState === VIEW_STATES.APP && timeToSpin === true && (
          <Container>
            <div>
              <Spin>Time to Spin!</Spin>
              <AlbumList albums={albums} />
            </div>
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
        )}
        {viewState === VIEW_STATES.APP && timeToSpin === false && (
          <Container>
            <div>
              <Form handleSubmit={handleSubmit} />
              <AlbumList albums={albums} />
            </div>
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
        )}
        {viewState === VIEW_STATES.FEED && (
          <FeedWrapper>
            <Feed messages={messages} />
          </FeedWrapper>
        )}
      </Container>
      <br />
      <br />
      <Container>
        <Button onClick={() => setViewState(VIEW_STATES.APP)}>App</Button>
        <Button onClick={() => setViewState(VIEW_STATES.FEED)}>Feed</Button>
        <Button onClick={signOutOfAppButton}>Sign Out</Button>
      </Container>
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

const Button = styled.button`
  font-size: 1rem;
  text-shadow: 0.5px 0.5px hsla(204deg 70% 66% / 0.9);
  padding: 1rem;
  margin: 0.5rem;
  border-radius: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background: radial-gradient(
    hsl(358deg 99% 84% /0.3),
    hsl(358deg 99% 64% /0.3)
  );
  box-shadow: 0 2px 4px hsl(358deg 99% 24% /0.3);
  transform: scale(1.1);
  :hover {
    box-shadow: none;
    color: hsla(204deg 90% 66% / 0.9);
  }
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
