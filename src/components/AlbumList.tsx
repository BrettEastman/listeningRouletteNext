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
  padding: var(--spacing-lg);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  background: var(--color-surface);
  margin-top: var(--spacing-xl);
  box-shadow: var(--shadow-sm);
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
  &:hover {
    border-color: var(--color-primary-light);
    box-shadow: var(--shadow-md);
  }
  ol {
    color: var(--color-text-primary);
    padding-left: 0;
    list-style: none;
    margin: 0;
    li {
      padding: var(--spacing-sm) 0;
      border-bottom: 1px solid var(--color-border-light);
      &:last-child {
        border-bottom: none;
      }
      &::before {
        content: "● ";
        color: var(--color-primary);
        margin-right: var(--spacing-sm);
      }
    }
  }
`;
