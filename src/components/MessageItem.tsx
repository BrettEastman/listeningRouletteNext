import styled from "styled-components";
import { Message } from "../types";
import { Stack, Paragraph, Container } from "../app/styles";

// MessageItem is a single chat message
export default function MessageItem({ userName, text }: Message) {
  return (
    <MessageWrapper>
      <Stack $justifyContent="space-around" $gap="1rem">
        <div>
          <Name>{userName}</Name>
        </div>
        <Paragraph size="1rem">{text}</Paragraph>
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
  padding: var(--spacing-md);
  background: var(--color-primary-light);
  color: var(--color-text-inverse);
  border-radius: var(--radius-lg);
  margin: var(--spacing-sm) 0;
  border: 1px solid var(--color-primary);
  box-shadow: var(--shadow-sm);
  transition: all 0.2s ease;
  &:hover {
    box-shadow: var(--shadow-md);
    transform: translateX(4px);
  }
`;

const Name = styled.span`
  font-weight: 600;
  font-size: var(--font-size-lg);
  color: var(--color-text-inverse);
`;

const EmotoSpan = styled.span`
  cursor: pointer;
  &:hover {
    transform: scale(1.25);
  }
`;
