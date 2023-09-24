import styled from "styled-components";

interface MItem {
  uid: string;
  text: string;
  createdAt: string;
}

const MessageItem = ({ uid, text, createdAt }: MItem) => {
  return (
    <MessageWrapper>
      <div>
        <Span>{uid}</Span>
      </div>
      <div>
        <P>{text}</P>
        <MessageFooter>
          <EmotoSpan>❤️</EmotoSpan>
          <EmotoSpan>🤣</EmotoSpan>
          <EmotoSpan>🙌</EmotoSpan>
          <EmotoSpan>🫥</EmotoSpan>
          <EmotoSpan>👏</EmotoSpan>
          <EmotoSpan>🎯</EmotoSpan>
        </MessageFooter>
      </div>
    </MessageWrapper>
  );
};

const MessageWrapper = styled.div`
  font-family: inherit;
  font-size: 1.2rem;
  background: radial-gradient(
    hsl(358deg 99% 84% /0.3),
    hsl(358deg 99% 64% /0.3)
  );
  text-shadow: 0.5px 0.5px hsla(204deg 70% 66% / 0.9);
  border-radius: 8px;
  padding: 5px;
  box-shadow: 0 2px 4px hsl(358deg 99% 24% /0.3);
  margin: 5px;
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
  justify-content: space-around;
  padding: 5px;
  margin: 5px;
`;

export default MessageItem;
