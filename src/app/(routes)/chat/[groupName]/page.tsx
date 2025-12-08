"use client";
import { useParams } from "next/navigation";
import { useState, useEffect, ChangeEvent } from "react";
import { useAuthContext } from "@/context/AuthContext";
import { doc, getDoc } from "firebase/firestore";
import ChatRoom from "@/components/ChatRoom";
import { db } from "@/firebase/config";
import styled from "styled-components";
import {
  BorderStack,
  BoxWrapper,
  Container,
  Form,
  Input,
  Paragraph,
  Stack,
} from "@/app/styles";
import FormInput from "@/components/form/FormInput";
import sendInfluences from "@/controller/sendInfluences";
import { useRouter } from "next/navigation";

export default function ChatPage() {
  const { groupName } = useParams();
  const router = useRouter();
  const { user } = useAuthContext();
  const [isGroupMember, setIsGroupMember] = useState(false);
  const [loading, setLoading] = useState(true);
  const [thinking, setThinking] = useState(false);
  const [result, setResult] = useState("");
  const [artist, setArtist] = useState("");

  const influencesResponse = `Tell me about the history of ${artist}. Who are their influences? Also, could you include a link to their wikipedia entry or their website?`;

  useEffect(() => {
    const checkGroupMembership = async () => {
      if (!groupName) return;
      if (!user) {
        return router.push("/signin");
      }
      localStorage.setItem("currentGroup", groupName as string);
      const groupMembersRef = doc(db, "groupMembers", groupName as string);
      const groupMembersSnap = await getDoc(groupMembersRef);
      if (groupMembersSnap.exists()) {
        const members = groupMembersSnap.data();
        setIsGroupMember(!!members[user.uid]);
      }
      setLoading(false);
    };
    checkGroupMembership();
  }, [user, groupName]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!isGroupMember) {
    return <div>You are not a member of this group.</div>;
  }

  async function onSubmit(event: ChangeEvent<HTMLFormElement>) {
    event.preventDefault();
    setThinking(true);
    const chatbotReply = await sendInfluences(influencesResponse);
    setResult(chatbotReply);
    setThinking(false);
    setArtist("");
  }

  return (
    <Container>
      <Stack>
        <BoxWrapper>
          <Form onSubmit={onSubmit}>
            <Stack $gap="1rem">
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
      <ChatMainContainer>
        <h1>Chat Room: {groupName}</h1>
        <ChatRoom groupName={groupName as string} />
      </ChatMainContainer>
    </Container>
  );
}

const ChatMainContainer = styled.div`
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: var(--spacing-lg);
  margin-top: var(--spacing-lg);
  background: var(--color-surface);
  box-shadow: var(--shadow-sm);

  h1 {
    color: var(--color-text-primary);
    font-size: var(--font-size-2xl);
    font-weight: 600;
    margin-bottom: var(--spacing-lg);
  }
`;
