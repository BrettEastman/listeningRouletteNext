"use client";
import React, { useState } from "react";
import styled from "styled-components";

export default function AddAlbum({ handleAlbum }: any) {
  const [album, setAlbum] = useState("");
  const [artist, setArtist] = useState("");

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const data = {
      album: album,
      artist: artist,
    };
    handleAlbum(data);
  };

  return (
    <Container>
      <form onSubmit={handleSubmit}>
        <label>
          Album:
          <input
            type="text"
            name="album"
            onChange={(e) => setAlbum(e.target.value)}
          />
        </label>
        <label>
          Artist:
          <input
            type="text"
            name="artist"
            onChange={(e) => setArtist(e.target.value)}
          />
        </label>
        <input type="submit" value="Submit" />
      </form>
    </Container>
  );
}

const Container = styled.div`
  form {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;
