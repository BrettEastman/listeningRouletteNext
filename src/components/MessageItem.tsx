import React from "react";
import styled from "styled-components";
import { Message } from "../types";

export default function MessageItem({ uid, text, createdAt }: Message) {
  return (
    <MessageWrapper>
      <StackGapAlign>
        <div>
          <Span>{uid}</Span>
        </div>
        <P>{text}</P>
        <div>
          <MessageFooter>
            <EmotoSpan>❤️</EmotoSpan>
            <EmotoSpan>🤣</EmotoSpan>
            <EmotoSpan>🙌</EmotoSpan>
            <EmotoSpan>🫥</EmotoSpan>
            <EmotoSpan>🎯</EmotoSpan>
          </MessageFooter>
        </div>
      </StackGapAlign>
    </MessageWrapper>
  );
}

const MessageWrapper = styled.div`
  padding: 1.5rem;
  font-size: 1.1rem;
  background: radial-gradient(
    hsl(358deg 99% 84% /0.3),
    hsl(358deg 99% 64% /0.3)
  );
  text-shadow: 0.5px 0.5px hsla(204deg 70% 66% / 0.9);
  border-radius: 8px;
  box-shadow: 0 2px 4px hsl(358deg 99% 24% /0.3);
  margin: 8px;
`;

const StackGapAlign = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: flex-start;
  gap: 1rem;
`;

const Span = styled.span`
  font-weight: 600;
`;

const P = styled.p`
  font-size: 1rem;
`;

const EmotoSpan = styled.span`
  cursor: pointer;
  &:hover {
    transform: scale(1.25);
  }
`;

const MessageFooter = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-top: 8px;
  gap: 4rem;
`;
