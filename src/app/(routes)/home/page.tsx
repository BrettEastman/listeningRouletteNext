"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import styled from "styled-components";
import AddAlbum from "@/components/AddAlbum";
import AlbumList from "@/components/AlbumList";
import Roulette from "@/components/Roulette";
import { useAuthContext } from "@/context/AuthContext";
import {
  addData,
  getAlbums,
  setOrUpdateUserData,
} from "@/firebase/firestore/model";
import { AlbumEntry, UserData } from "@/types.js";
import { Container, Stack } from "../../styles";
import { useGroupStore } from "@/store/useGroupStore";

export default function Home() {
  const router = useRouter();
  const { user } = useAuthContext();
  const { userData, setUserData } = useGroupStore();

  console.log("userData from home page:", userData);

  const [albums, setAlbums] = useState<AlbumEntry[]>([]);

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
    setOrUpdateUserData(userData, user?.displayName);
    fetchAlbums();
  }, [user?.displayName, userData]);

  const handleAlbum = async (obj: AlbumEntry[]) => {
    const { result, error } = await addData("lr", userData.userId, obj);
    if (error) {
      console.log("add album error:", error);
    } else {
      fetchAlbums();
    }
  };

  // const handleAlbum = (data: AlbumEntry[]) => {
  //   userData.listeningGroups[0].groupSessions[0].sessionAlbums = data;
  //   // setOrUpdateUserData(userData, userData.user);
  // };

  const handleSubmit = (data: AlbumEntry[]) => {
    if (Object.keys(albums).length >= 5) {
      handleAlbum(data);
    }
  };

  const handleUserData = async () => {
    await setOrUpdateUserData(userData, userData.user);
  };

  const logUserData = () => {
    console.log("userData:", userData);
  };

  return (
    <Stack gap="6rem">
      <Container>
        <Container gap="16rem">
          <div>
            <BoxWrapper>
              <AddAlbum
                currentUserId={userData.userId}
                handleSubmit={handleSubmit}
              />
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
