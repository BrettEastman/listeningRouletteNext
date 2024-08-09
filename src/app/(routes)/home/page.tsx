"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import styled from "styled-components";
import AddAlbum from "../../../components/AddAlbum";
import AlbumList from "../../../components/AlbumList";
import Roulette from "../../../components/Roulette";
import { useAuthContext } from "../../../context/AuthContext";
import {
  addData,
  getAlbums,
  setOrUpdateUserData,
  getUserSnapshot,
} from "../../../firebase/firestore/model";
import { AlbumEntry, UserData } from "../../../types.js";
import { initialUserDataState } from "../../lib/initialStates.ts";
import { Container, Stack, Subtitle } from "../../styles";

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

  const [currentUserData, setCurrentUserData] =
    useState<UserData>(initialState);
  const [albums, setAlbums] = useState<AlbumEntry[]>([]);

  useEffect(() => {
    const fetchSnapshot = async () => {
      try {
        const { success, message, error, res } = await getUserSnapshot();
        if (error) {
          console.error(message);
        } else if (res) {
          console.log(success);
          console.log("res from useEffect:", res);
          // setCurrentUserData((prevCurrentUserData) => ({
          //   ...prevCurrentUserData,
          //   ...res[0],
          // }));
        }
      } catch (error) {
        console.error(error);
      }
    };
    if (user == null) {
      return router.push("/signin");
    } else {
      fetchSnapshot();
    }
  }, [router, user]);

  const fetchAlbums = async () => {
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
    fetchAlbums();
  }, []);

  const handleAlbum = async (obj: AlbumEntry[]) => {
    const { result, error } = await addData("lr", userId, obj);
    if (error) {
      console.log("add album error:", error);
    } else {
      fetchAlbums();
    }
  };

  // const handleAlbum = (data: AlbumEntry[]) => {
  //   currentUserData.listeningGroups[0].groupSessions[0].sessionAlbums = data;
  //   // setOrUpdateUserData(currentUserData, userName);
  // };

  const handleSubmit = (data: AlbumEntry[]) => {
    if (Object.keys(albums).length >= 5) {
      handleAlbum(data);
    }
  };

  const handleUserData = async () => {
    await setOrUpdateUserData(currentUserData, userName);
  };

  const logUserData = () => {
    console.log("userData:", currentUserData);
  };

  return (
    <Stack gap="6rem">
      <Container>
        <Container gap="16rem">
          <div>
            <BoxWrapper>
              <AddAlbum currentUserId={userId} handleSubmit={handleSubmit} />
              <AlbumList albums={albums} />
              <button onClick={handleUserData}>handle user data</button>
              <button onClick={logUserData}>log user data</button>
            </BoxWrapper>
          </div>
          <Stack>
            <Roulette albums={albums} />
          </Stack>
        </Container>
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
