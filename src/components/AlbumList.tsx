import React from "react";
import styled from "styled-components";
import { AlbumEntry } from "../types";

interface AlbumProp {
  albums: AlbumEntry[];
}

export default function AlbumList({ albums }: AlbumProp) {
  return (
    <ListWrapper>
      <strong>Current Picks:</strong>
      {albums[0]?.name !== undefined
        ? albums.map((album) => {
            return <ol key={album._id}>{`${album?.name}: ${album?.album}`}</ol>;
          })
        : null}
    </ListWrapper>
  );
}

const ListWrapper = styled.div`
  font-size: 1rem;
  text-shadow: 0.5px 0.5px hsla(204deg 70% 66% / 0.9);
  padding: 1.25rem;
  margin: 0.5rem;
  border: 0.5px solid white;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background: radial-gradient(
    hsl(358deg 99% 84% /0.3),
    hsl(358deg 99% 64% /0.3)
  );
  gap: 0.5rem;
  letter-spacing: 1px;
  margin-top: 2.8rem;
  box-shadow: 0 2px 4px hsl(358deg 99% 24% /0.3);
  transform: scale(1.1);
  ol {
    padding-left: 0;
    &::before {
      content: "● ";
    }
  }
`;
