import React, { useState, useEffect } from "react";
import {
  collection,
  addDoc,
  onSnapshot,
  query,
  orderBy,
  limit,
} from "firebase/firestore";
import styled from "styled-components";
import { db } from "@/firebase/config";
import { useAuthContext } from "@/context/AuthContext";
import { Message } from "@/types";
import MessageItem from "@/components/MessageItem";

interface ChatRoomProps {
  groupName: string;
}

export default function ChatRoom({ groupName }: ChatRoomProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const { user } = useAuthContext();

  useEffect(() => {
    if (!groupName) return;
    const messagesRef = collection(db, "groups", groupName, "messages");
    const q = query(messagesRef, orderBy("timestamp", "asc"), limit(100));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const newMessages = snapshot.docs.map(
        (doc) =>
          ({
            id: doc.id,
            ...doc.data(),
          } as Message)
      );
      setMessages(newMessages);
    });
    return () => unsubscribe();
  }, [groupName]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim() && user) {
      try {
        await addDoc(collection(db, "groups", groupName, "messages"), {
          text: newMessage,
          timestamp: new Date().toISOString(),
          userId: user.uid,
          userName: user.displayName || "Anonymous",
        });
        setNewMessage("");
      } catch (error) {
        console.error("Error adding document: ", error);
      }
    }
  };

  if (!user) {
    return <div>Please sign in to view the chat.</div>;
  }

  return (
    <ChatRoomContainer>
      <Title>Chat Room: {groupName}</Title>
      <MessagesContainer>
        {messages.map((message) => (
          <MessageItem
            key={message.id}
            text={message.text}
            userName={user.displayName}
          />
          // <MessageItem key={message.id}>
          //   <Username>{message.userName || "Unknown"}: </Username>
          //   <MessageText>{message.text}</MessageText>
          // </MessageItem>
        ))}
      </MessagesContainer>
      <Form onSubmit={handleSendMessage}>
        <InputGroup>
          <Input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type your message..."
          />
          <Button type="submit">Send</Button>
        </InputGroup>
      </Form>
    </ChatRoomContainer>
  );
}

// Styled components
const ChatRoomContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  max-width: 48rem;
  margin: 0 auto;
  padding: var(--spacing-lg);
  background-color: var(--color-surface);
  border-radius: var(--radius-lg);
  border: 1px solid var(--color-border);
  box-shadow: var(--shadow-sm);
`;

const Title = styled.h1`
  font-size: var(--font-size-2xl);
  font-weight: 600;
  margin-bottom: var(--spacing-lg);
  color: var(--color-text-primary);
`;

const MessagesContainer = styled.div`
  flex-grow: 1;
  overflow-y: auto;
  margin-bottom: var(--spacing-lg);
  background-color: var(--color-background);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  padding: var(--spacing-md);
  &::-webkit-scrollbar {
    width: 8px;
  }
  &::-webkit-scrollbar-track {
    background: var(--color-surface);
    border-radius: var(--radius-sm);
  }
  &::-webkit-scrollbar-thumb {
    background: var(--color-border);
    border-radius: var(--radius-sm);
    &:hover {
      background: var(--color-primary-light);
    }
  }
`;

// const MessageItem = styled.div`
//   margin-bottom: 0.5rem;
// `;

const Username = styled.span`
  font-weight: 600;
`;

const MessageText = styled.span`
  color: var(--color-text-primary);
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  padding: var(--spacing-sm) var(--spacing-md);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  background: var(--color-background);
  color: var(--color-text-primary);
  margin-bottom: var(--spacing-sm);
  transition: all 0.2s ease;
  &:focus {
    outline: none;
    border-color: var(--color-primary);
    box-shadow: 0 0 0 3px var(--color-primary-light);
  }
`;

const InputGroup = styled.div`
  display: flex;
  gap: var(--spacing-sm);
`;

const Button = styled.button`
  background-color: var(--color-primary);
  color: var(--color-text-inverse);
  padding: var(--spacing-sm) var(--spacing-lg);
  border-radius: var(--radius-pill);
  border: 1px solid var(--color-primary);
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  &:hover {
    background-color: var(--color-primary-dark);
    border-color: var(--color-primary-dark);
    transform: translateY(-1px);
    box-shadow: var(--shadow-md);
  }
  &:active {
    transform: translateY(0);
  }
  &:focus-visible {
    outline: 2px solid var(--color-primary);
    outline-offset: 2px;
  }
`;
