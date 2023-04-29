import styled from 'styled-components';
import MessageItem from '../messageitem/page';

const Feed = ({ messages }) => {
  return (
    <div>
      {messages.slice().reverse().map((message, index) => {
        return <UnorderedList><MessageItem key={index} name={message.name} body={message.body}/></UnorderedList>
      })}
    </div>
  )
};

const UnorderedList = styled.ul`
  border: 0.5px dashed 	hsl(358, 87%, 24%);
  border-radius: 10px;
  padding: 0.5rem;
  margin: 0.5rem;
`;

export default Feed;
