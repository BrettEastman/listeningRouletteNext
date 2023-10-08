"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
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
import {
  Button,
  Container,
  Input,
  Form,
  Stack,
  Paragraph,
  Subtitle,
} from "../styles";
import FormInput from "../../components/form/FormInput";

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
    <Stack gap="6rem">
      <Container>
        {viewState === VIEW_STATES.HOME && timeToSpin === true && (
          <Container gap="16rem">
            <div>
              <Subtitle>Time to Spin!</Subtitle>
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
          </Container>
        )}
        {viewState === VIEW_STATES.HOME && timeToSpin === false && (
          <Container gap="16rem">
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
          </Container>
        )}
        {viewState === VIEW_STATES.FEED && (
          <Container gap="6rem" alignItems="flex-start">
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
            <Stack>
              <BoxWrapper>
                <Form onSubmit={onSubmit}>
                  <div>
                    <FormInput
                      type="text"
                      name="artist"
                      placeholder="Artist name"
                      value={artist}
                      onChange={(e) => setArtist(e.target.value)}
                      labelText="Enter an artist's name to find out more"
                    />
                    <Input type="submit" value="Go!" />
                  </div>
                </Form>
              </BoxWrapper>
              <BorderStack>
                <BoxWrapper>
                  <Paragraph padding="1rem">{result}</Paragraph>
                </BoxWrapper>
              </BorderStack>
            </Stack>
          </Container>
        )}
      </Container>
      <Container>
        <Button onClick={() => setViewState(VIEW_STATES.HOME)}>Home</Button>
        <Button onClick={() => setViewState(VIEW_STATES.FEED)}>Feed</Button>
        <Button onClick={signOutOfAppButton}>Sign Out</Button>
      </Container>
    </Stack>
  );
}

const BorderStack = styled.div`
  border: 1.5px dashed white;
  border-radius: 8px;
`;

const BoxWrapper = styled.div`
  max-height: 36rem;
  width: 28rem;
`;
