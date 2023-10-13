import styled from "styled-components";
import { AlbumEntry } from "../types";
import { Subtitle } from "../app/styles";

interface AlbumProp {
  albums: AlbumEntry[];
}

// AlbumList is a list of the current listening group's albums. It is displayed on the Home page.
export default function AlbumList({ albums }: AlbumProp) {
  return (
    <ListWrapper>
      <Subtitle>Current Picks:</Subtitle>
      {albums[0]?.name !== undefined
        ? albums.map((album) => {
            return <ol key={album._id}>{`${album?.name}: ${album?.album}`}</ol>;
          })
        : null}
    </ListWrapper>
  );
}

const ListWrapper = styled.div`
  padding: 1rem;
  border: 0.5px solid white;
  border-radius: 8px;
  letter-spacing: 1px;
  margin-top: 2.8rem;
  box-shadow: 0 2px 4px hsl(358deg 99% 24% /0.3);
  ol {
    color: var(--text-color-light);
    padding-left: 0;
    &::before {
      content: "● ";
    }
  }
`;
