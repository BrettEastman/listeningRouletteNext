"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import styled from "styled-components";
import AddAlbum from "../../../components/AddAlbum";
import AlbumList from "../../../components/AlbumList";
import Roulette from "../../../components/Roulette";
import { useAuthContext } from "../../../context/AuthContext";
import { addData, getAlbums } from "../../../firebase/firestore/model";
import { AlbumEntry, Message } from "../../../types.js";
import { initialUserDataState } from "../../lib/initialStates.ts";
import { Container, Stack, Subtitle } from "../../styles";
import Link from "next/link";

export default function Home() {
  const router = useRouter();
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

  const [albums, setAlbums] = useState<AlbumEntry[]>([]);
  const [currentUser, setCurrentUser] = useState<string | null>("");
  const [currentUserId, setCurrentUserId] = useState<string>("");
  const [timeToSpin, setTimeToSpin] = useState(false);

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
      }
    } catch (error) {
      console.error("fetch error: ", error);
    }
  };

  useEffect(() => {
    fetchAll();
  }, []);

  const handleAlbum = async (obj: AlbumEntry[]) => {
    const { result, error } = await addData("lr", currentUserId, obj);
    if (error) {
      console.log("add album error:", error);
    } else {
      fetchAll();
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

  return (
    <Stack gap="6rem">
      <Container>
        <Link href="/feed" style={{ textDecoration: "none" }}>
          <NavButton>Feed</NavButton>
        </Link>
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

const BoxWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 36rem;
`;
