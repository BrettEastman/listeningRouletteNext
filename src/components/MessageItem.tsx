import styled from "styled-components";
import { Message } from "../types";
import { Stack, Paragraph, Container } from "../app/styles";

// MessageItem is a single chat message
export default function MessageItem({ uid, text, createdAt }: Message) {
  return (
    <MessageWrapper>
      <Stack justifyContent="space-around" gap="1rem">
        <div>
          <Name>{uid}</Name>
        </div>
        <Paragraph font-size="1rem">{text}</Paragraph>
        <div>
          <Container>
            <EmotoSpan>❤️</EmotoSpan>
            <EmotoSpan>🤣</EmotoSpan>
            <EmotoSpan>🙌</EmotoSpan>
            <EmotoSpan>🫥</EmotoSpan>
            <EmotoSpan>🎯</EmotoSpan>
          </Container>
        </div>
      </Stack>
    </MessageWrapper>
  );
}

const MessageWrapper = styled.div`
  padding: 1.5rem;
  background: radial-gradient(hsl(358deg 2% 84% /0.3), hsl(358deg 2% 64% /0.3));
  border-radius: 8px;
  margin: 8px;
`;

const Name = styled.span`
  font-weight: 600;
  font-size: 1.2rem;
`;

const EmotoSpan = styled.span`
  cursor: pointer;
  &:hover {
    transform: scale(1.25);
  }
`;
