"use client";
import { Container, Form, Input, Paragraph, Stack } from "@/app/styles";
import AddMessage from "@/components/AddMessage";
import Feed from "@/components/Feed";
import ChatRoom from "@/components/ChatRoom.tsx";
import FormInput from "@/components/form/FormInput";
import { addData, getMessages } from "@/firebase/firestore/model";
import { useRouter } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";
import styled from "styled-components";
import { useAuthContext } from "../../../context/AuthContext";
import sendInfluences from "../../../controller/sendInfluences";
import { Message } from "../../../types";
import { initialUserDataState } from "../../lib/initialStates.ts";

export default function FeedPage() {
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

  const [messages, setMessages] = useState<Message[]>([]);
  const [thinking, setThinking] = useState(false);
  const [result, setResult] = useState("");
  const [artist, setArtist] = useState("");
  const [currentUser, setCurrentUser] = useState<string | null>("");
  const [currentUserId, setCurrentUserId] = useState<string>("");

  const influencesResponse = `Tell me about the history of ${artist}. Who are their influences? Also, could you include a link to their wikipedia entry or their website?`;

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
    fetchAllMessages();
  }, []);

  useEffect(() => {
    if (user == null) {
      return router.push("/signin");
    }
    if (user) {
      setCurrentUser(user.email);
      setCurrentUserId(user.uid);
    }
  }, [router, user]);

  const handleMessage = async (obj: Message[]) => {
    const { result, error } = await addData("messages", currentUserId, obj);
    if (error) {
      console.log("handle message error:", error);
    } else {
      fetchAllMessages();
    }
  };

  async function onSubmit(event: ChangeEvent<HTMLFormElement>) {
    event.preventDefault();
    setThinking(true);
    const chatbotReply = await sendInfluences(influencesResponse);
    setResult(chatbotReply);
    setThinking(false);
    setArtist("");
  }

  return (
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
        {/* <BoxWrapper>
          <AddMessage currentUser={currentUser} handleMessage={handleMessage} />
        </BoxWrapper>
        <BorderStack>
          <BoxWrapper>
            <Feed messages={messages} />
          </BoxWrapper>
        </BorderStack> */}
        <ChatRoom groupName={""} />
      </Stack>
    </Container>
  );
}

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
