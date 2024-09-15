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
          <MessageItem key={message.id}>
            <Username>{message.userName || "Unknown"}: </Username>
            <MessageText>{message.text}</MessageText>
          </MessageItem>
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
  max-width: 28rem;
  margin: 0 auto;
  padding: 1rem;
  background-color: #f3f4f6;
`;

const Title = styled.h1`
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 1rem;
`;

const MessagesContainer = styled.div`
  flex-grow: 1;
  overflow-y: auto;
  margin-bottom: 1rem;
  background-color: white;
  border: 1px solid #d1d5db;
  padding: 0.5rem;
`;

const MessageItem = styled.div`
  margin-bottom: 0.5rem;
`;

const Username = styled.span`
  font-weight: bold;
`;

const MessageText = styled.span``;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  padding: 0.5rem;
  border: 1px solid #d1d5db;
  margin-bottom: 0.5rem;
`;

const InputGroup = styled.div`
  display: flex;
`;

const Button = styled.button`
  background-color: #3b82f6;
  color: white;
  padding: 0.5rem 1rem;
  margin-left: 0.5rem;
`;
