import styled from 'styled-components';
import MessageItem from './MessageItem';
import { Message } from './types';

interface FeedMessages {
  messages: Message[]
}

const Feed = ({ messages }: FeedMessages) => {
  return (
    <UnorderedList>
      {messages.slice().reverse().map((message, index) => {
        return <MessageItem key={index} name={message.name} body={message.body} time={''}/>
      })}
    </UnorderedList>
  )
};

const UnorderedList = styled.ul`
  border: 0.5px dashed 	hsl(358, 87%, 24%);
  border-radius: 10px;
  padding: 0.5rem;
  margin: 0.5rem;
`;

export default Feed;
