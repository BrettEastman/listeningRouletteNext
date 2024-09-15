import React, { useState, useEffect } from "react";
import {
  collection,
  addDoc,
  onSnapshot,
  query,
  orderBy,
  limit,
  doc,
  getDoc,
} from "firebase/firestore";
import { User } from "firebase/auth";
import styled from "styled-components";
import { db, auth } from "@/firebase/config";

// TypeScript interfaces
interface Message {
  id: string;
  text: string;
  timestamp: string;
  userId: string;
}

interface ChatUser {
  user: string;
  name: string;
}

interface ChatRoomProps {
  groupName: string;
}

export default function ChatRoom({ groupName }: ChatRoomProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [users, setUsers] = useState<{ [key: string]: ChatUser }>({});
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribeAuth = auth.onAuthStateChanged((user) => {
      console.log("user from ChatRoom useEffect:", user);
      setCurrentUser(user);
    });
    return () => unsubscribeAuth();
  }, []);

  useEffect(() => {
    if (!groupName) return;
    // Update this line to use the correct subcollection path
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
      // Fetch user details for new users
      newMessages.forEach((message) => {
        console.log("message from ChatRoom useEffect:", message);
        if (!users[message.userId]) {
          fetchUserDetails(message.userId);
        }
      });
    });

    return () => unsubscribe();
  }, [groupName]);

  console.log("messages:", messages);
  console.log("users:", users);

  const fetchUserDetails = async (userId: string) => {
    const userRef = doc(db, "users", userId);
    const userSnap = await getDoc(userRef);
    if (userSnap.exists()) {
      const userData = userSnap.data() as ChatUser;
      setUsers((prevUsers) => ({ ...prevUsers, [userId]: userData }));
    }
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim() && currentUser) {
      try {
        // Update this line to use the correct subcollection path
        await addDoc(collection(db, "groups", groupName, "messages"), {
          text: newMessage,
          timestamp: new Date().toISOString(),
          userId: currentUser.uid,
        });
        setNewMessage("");
      } catch (error) {
        console.error("Error adding document: ", error);
      }
    }
  };

  if (!currentUser) {
    return <div>Please sign in to view the chat.</div>;
  }

  return (
    <ChatRoomContainer>
      <Title>Chat Room: {groupName}</Title>
      <MessagesContainer>
        {messages.map((message) => (
          <MessageItem key={message.id}>
            <Username>{users[message.userId]?.user || "Unknown"}: </Username>
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

// Styled Components (unchanged)
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
