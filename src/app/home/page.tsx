"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import AddAlbum from "../../components/AddAlbum";
import AddMessage from "../../components/AddMessage";
import AlbumList from "../../components/AlbumList";
import Feed from "../../components/Feed";
import Roulette from "../../components/Roulette";
import { useAuthContext } from "../../context/AuthContext";
import sendInfluences from "../../controller/sendInfluences";
import { signOutOfApp } from "../../firebase/auth/api.js";
import {
  addData,
  getAlbums,
  getMessages,
} from "../../firebase/firestore/model";
import { AlbumEntry, Message } from "../../types.js";
import { Button } from "../styles";

export default function Home() {
  const { user } = useAuthContext();

  const [messages, setMessages] = useState<Message[]>([]);
  const [albums, setAlbums] = useState<AlbumEntry[]>([]);
  const [viewState, setViewState] = useState(0);
  const [currentUser, setCurrentUser] = useState("");
  const [currentUserId, setCurrentUserId] = useState("");
  const [timeToSpin, setTimeToSpin] = useState(false);
  const [artist, setArtist] = useState("");
  const [result, setResult] = useState("");

  const VIEW_STATES = { HOME: 0, FEED: 1 };

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

  const influencesResponse = `Tell me about the history of ${artist}. Who are their influences? Also, could you include a link to their wikipedia entry or their website?`;

  async function onSubmit(event) {
    event.preventDefault();
    const chatbotReply = await sendInfluences(influencesResponse);
    setResult(chatbotReply);
    setArtist("");
  }

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
      <StackGap>
        <Container>
          {viewState === VIEW_STATES.HOME && timeToSpin === true && (
            <ContainerGap>
              <div>
                <Spin>Time to Spin!</Spin>
                <BoxWrapper>
                  <AlbumList albums={albums} />
                </BoxWrapper>
              </div>
              <Stack>
                <Roulette
                  albums={albums}
                  viewState={viewState}
                  setViewState={setViewState}
                />
              </Stack>
            </ContainerGap>
          )}
          {viewState === VIEW_STATES.HOME && timeToSpin === false && (
            <ContainerGap>
              <div>
                <BoxWrapper>
                  <AddAlbum handleSubmit={handleSubmit} />
                  <AlbumList albums={albums} />
                </BoxWrapper>
              </div>
              <Stack>
                <Roulette
                  albums={albums}
                  viewState={viewState}
                  setViewState={setViewState}
                />
              </Stack>
            </ContainerGap>
          )}
          {viewState === VIEW_STATES.FEED && (
            <div>
              <Stack>
                <BoxWrapper>
                  <Feed messages={messages} />
                </BoxWrapper>
                <BoxWrapper>
                  <AddMessage
                    currentUser={currentUser}
                    handleMessage={handleMessage}
                  />
                </BoxWrapper>
              </Stack>
              <div>
                <h3>
                  More information on the history and influences of the
                  following artist
                </h3>
                <form onSubmit={onSubmit}>
                  <input
                    type="text"
                    name="artist"
                    placeholder="Enter an artist"
                    value={artist}
                    onChange={(e) => setArtist(e.target.value)}
                  />
                  <input type="submit" value="Influences" />
                </form>
                <div>{result}</div>
              </div>
            </div>
          )}
        </Container>
        <Container>
          <Button onClick={() => setViewState(VIEW_STATES.HOME)}>Home</Button>
          <Button onClick={() => setViewState(VIEW_STATES.FEED)}>Feed</Button>
          <Button onClick={signOutOfAppButton}>Sign Out</Button>
        </Container>
      </StackGap>
    </div>
  );
}

const Title = styled.h1`
  font-family: "Cedarville Cursive", cursive;
  color: #f1181f;
  opacity: 0.8;
  font-size: 5rem;
  letter-spacing: 2px;
  -webkit-text-stroke-width: 0.1px;
  -webkit-text-stroke-color: #f44a50;
  text-shadow: 1px 1px 2px black;
  padding-bottom: 4rem;
  margin-left: 1.5rem;
`;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  gap: 1rem;
`;

const ContainerGap = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  gap: 16rem;
`;

const Stack = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  gap: 2rem;
`;

const StackGap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6rem;
`;

const BoxWrapper = styled.div`
  max-height: 36rem;
  width: 28rem;
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
  letter-spacing: 2px;
  transform: scale(1.1);
`;
