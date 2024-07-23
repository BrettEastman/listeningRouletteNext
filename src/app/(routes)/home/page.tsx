"use client";
import { useRouter } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";
import styled from "styled-components";
import AddAlbum from "../../../components/AddAlbum";
import AddMessage from "../../../components/AddMessage";
import AlbumList from "../../../components/AlbumList";
import Feed from "../../../components/Feed";
import Roulette from "../../../components/Roulette";
import FormInput from "../../../components/form/FormInput";
import { useAuthContext } from "../../../context/AuthContext";
import sendInfluences from "../../../controller/sendInfluences";
import { signOutOfApp } from "../../../firebase/auth/api.js";
import {
  addData,
  getAlbums,
  getMessages,
} from "../../../firebase/firestore/model";
import { AlbumEntry, Message } from "../../../types.js";
import {
  Container,
  Form,
  Input,
  Paragraph,
  Stack,
  Subtitle,
} from "../../styles";
import { initialUserDataState } from "../../lib/initialStates.ts";

export default function Home() {
  const { user } = useAuthContext();
  const userName = user?.displayName;
  const userEmail = user?.email;
  const userId = user?.uid;

  const initialState = {
    ...initialUserDataState,
    user: userName,
    email: userEmail,
    userId: userId,
  };

  const [userData, setUserData] = useState(initialState);

  const VIEW_STATES = { HOME: 0, FEED: 1 };
  const [viewState, setViewState] = useState(0);

  const [messages, setMessages] = useState<Message[]>([]);
  const [albums, setAlbums] = useState<AlbumEntry[]>([]);
  const [currentUser, setCurrentUser] = useState<string | null>("");
  const [currentUserId, setCurrentUserId] = useState<string>("");
  const [timeToSpin, setTimeToSpin] = useState(false);
  const [thinking, setThinking] = useState(false);
  const [artist, setArtist] = useState("");
  const [result, setResult] = useState("");

  const router = useRouter();

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

  async function onSubmit(event: ChangeEvent<HTMLFormElement>) {
    event.preventDefault();
    setThinking(true);
    const chatbotReply = await sendInfluences(influencesResponse);
    setResult(chatbotReply);
    setThinking(false);
    setArtist("");
  }

  const fetchAll = async () => {
    try {
      const { data, error } = await getAlbums();
      if (error) {
        console.error("fetch error: ", error);
      } else {
        setAlbums(data as AlbumEntry[]);
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

  const handleAlbum = async (obj: AlbumEntry[]) => {
    const { result, error } = await addData("lr", currentUserId, obj);
    if (error) {
      console.log("add album error:", error);
    } else {
      fetchAll();
    }
  };

  const handleMessage = async (obj: Message[]) => {
    const { result, error } = await addData("messages", currentUserId, obj);
    if (error) {
      console.log("handle message error:", error);
    } else {
      fetchAllMessages();
    }
  };

  const handleSubmit = (data: AlbumEntry[]) => {
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
        <NavButton onClick={() => setViewState(VIEW_STATES.HOME)}>
          Home
        </NavButton>
        <NavButton onClick={() => setViewState(VIEW_STATES.FEED)}>
          Feed
        </NavButton>
        <NavButton onClick={signOutOfAppButton}>Sign Out</NavButton>
      </Container>
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
                <AddAlbum
                  currentUserId={currentUserId}
                  handleSubmit={handleSubmit}
                />
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
                <Form onSubmit={onSubmit}>
                  <Stack gap="1rem">
                    <FormInput
                      type="text"
                      name="artist"
                      placeholder="Enter an artist's name to find out more"
                      value={artist}
                      onChange={(e: ChangeEvent<HTMLFormElement>) =>
                        setArtist(e.target.value)
                      }
                      labelText=""
                      autocomplete="on"
                    />
                    <div>
                      <Input type="submit" value="Go!" />
                    </div>
                    {thinking && <Paragraph>Searching...</Paragraph>}
                  </Stack>
                </Form>
              </BoxWrapper>
              <BorderStack>
                <BoxWrapper>
                  <Paragraph padding="1rem">{result}</Paragraph>
                </BoxWrapper>
              </BorderStack>
            </Stack>
            <Stack>
              <BoxWrapper>
                <AddMessage
                  currentUser={currentUser}
                  handleMessage={handleMessage}
                />
              </BoxWrapper>
              <BorderStack>
                <BoxWrapper>
                  <Feed messages={messages} />
                </BoxWrapper>
              </BorderStack>
            </Stack>
          </Container>
        )}
      </Container>
    </Stack>
  );
}

const NavButton = styled.button`
  padding: 1.5rem;
  font-size: 1.5rem;
  letter-spacing: 2px;
  color: var(--text-color-tuscan-red-dark);
  background: transparent;
  border-radius: 50%;
  border: none;
  transition: all 0.4s ease-out;
  box-shadow: 0 2px 4px hsl(358deg 99% 24% /0.3);
  cursor: pointer;
  :hover {
    border: 0.5px solid white;
    background: radial-gradient(
      hsl(358deg 99% 84% /0.3),
      hsl(358deg 99% 64% /0.3)
    );
    box-shadow: none;
    color: hsla(204deg 90% 66% / 0.9);
  }
`;

const BorderStack = styled.div`
  border: 1.5px dashed white;
  border-radius: 8px;
  overflow: auto;
`;

const BoxWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 36rem;
`;
