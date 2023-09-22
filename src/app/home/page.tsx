"use client";
import { AlbumEntry, Message } from "@/types.js";
import { useState, useEffect } from "react";
import { useAuthContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import styled from "styled-components";
import {
  addData,
  getDocument,
  getAlbums,
  getMessages,
} from "@/firebase/firestore/model";
import GlobalStyles from "../../GlobalStyles.js";
import AlbumList from "../../components/AlbumList";
import Form from "../../components/form/Form";
import Feed from "../../components/Feed";
import Roulette from "../../components/Roulette";
import SignOut from "../../firebase/auth/signout.js";
import firebase from "firebase/app";

// interface AuthContextType {
//   user: firebase.User | null;
// }

export default function Home() {
  const { user } = useAuthContext();
  // const { user } = useAuthContext<AuthContextType>();
  // const { user } = useAuthContext<{ user: firebase.User | null }>();

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
      // console.log("user:", user);
      // console.log("Object.keys:", Object.keys(user));
    }
  }, [router, user]);

  const fetchAll = async () => {
    try {
      const { data, error } = await getAlbums();
      if (error) {
        console.error("fetch error: ", error);
      } else {
        setAlbums(data as AlbumEntry[]); // add type assertion
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

  const signOutOfApp = () => {
    SignOut();
    router.push("/signin");
  };

  const utilityFunction = () => {
    console.log("albums:", albums);
    console.log("messages:", messages);
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
      <button onClick={() => signOutOfApp()}>Sign Out</button>
      <button onClick={() => utilityFunction()}>Test</button>
      <button onClick={() => getMessages()}>getMessages</button>
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
