import React from "react";
import styled from "styled-components";
import MessageItem from "./MessageItem";
import { Message } from "../types";

interface FeedMessages {
  messages: Message[];
}

export default function Feed({ messages }: FeedMessages) {
  return (
    <UnorderedList>
      {messages
        .slice()
        .reverse()
        .map((message, index) => {
          return (
            <MessageItem
              key={index}
              uid={message.uid}
              text={message.text}
              createdAt={""}
            />
          );
        })}
    </UnorderedList>
  );
}

const UnorderedList = styled.ul`
  border: 1.5px dashed white;
  border-radius: 10px;
  padding: 0.5rem;
  gap: 0.5rem;
  /* margin: 0.5rem; */
`;
