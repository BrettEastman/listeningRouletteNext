"use client";
import { ChangeEvent, useState } from "react";
import { Form, Input, Subtitle } from "../app/styles";
import FormInput from "./form/FormInput";
import { initialAlbumEntryState } from "@/app/lib/initialStates";

interface FormProps {
  handleSubmit: any;
  currentUserId: string | null | undefined;
}

// AddAlbum is a form that allows the user to add an album to the database. It is then displayed on the home page.
export default function AddAlbum({ handleSubmit, currentUserId }: FormProps) {
  const [albumFormInput, setAlbumFormInput] = useState(initialAlbumEntryState);

  const clearForm = () => {
    setAlbumFormInput(initialAlbumEntryState);
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setAlbumFormInput({
      ...albumFormInput,
      uid: currentUserId,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <Form
      onSubmit={(event) => {
        event.preventDefault();
        handleSubmit(albumFormInput);
        clearForm();
      }}
    >
      <Subtitle>Enter your pick!</Subtitle>
      <div>
        <FormInput
          labelText="Artist Name"
          type="text"
          name="artistName"
          value={albumFormInput.artistName}
          placeholder="Enter artist name"
          onChange={handleInputChange}
          autocomplete="on"
        />
        <br />
        <FormInput
          labelText="Album Name"
          type="text"
          name="albumName"
          value={albumFormInput.albumName}
          placeholder="Enter album name"
          onChange={handleInputChange}
          autocomplete="on"
        />
        <br />
        <Input type="submit" value="Submit"></Input>
      </div>
    </Form>
  );
}
