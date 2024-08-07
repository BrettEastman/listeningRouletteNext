"use client";
import { useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";
import {
  Button,
  Form,
  InputRectangle,
  Label,
  Paragraph,
  StyledWrapper,
  Subtitle,
} from "../../styles";
import { SelectEvent } from "../../../types";

const exampleGroups = ["GPHSB Group", "funemployment Group", "Quarantinos"];

const exampleUser = {
  userId: "235ihllk3",
  user: "Jane Doe",
  email: "jd@email.com",
  bio: "",
  photoURL: "",
  listeningGroups: exampleGroups,
};

export default function Groups() {
  const [userData, setUserData] = useState(exampleUser);
  const [groupName, setGroupName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  function handleGroup(event: SelectEvent) {
    const selectedGroup = event.target.value as string;
    setUserData({
      ...userData,
      listeningGroups: [...userData.listeningGroups, selectedGroup],
    });
  }

  const handleSubmit = async (event: ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    // await signUp(email, password, `${firstName} ${groupName}`);
    router.push("/home");
  };

  return (
    <StyledWrapper>
      <Subtitle>Groups</Subtitle>
      <Form onSubmit={handleSubmit}>
        <StyledWrapper justifyContent="space-between" gap="2rem">
          <label
            style={{
              marginLeft: "1rem",
              marginTop: "1rem",
              textAlign: "center",
              fontSize: "1.25rem",
            }}
            htmlFor="level-select"
          >
            Choose previous group:
          </label>
          <select name="groups" id="group-select" onChange={handleGroup}>
            {userData.listeningGroups.map((group) => (
              <option key={group} value={group.split(" ").join("-")}>
                {group}
              </option>
            ))}
          </select>
          <Label htmlFor="groupName">
            <Paragraph>Create New Group</Paragraph>
            <InputRectangle
              onChange={(e) => setGroupName(e.target.value)}
              required
              type="text"
              name="groupName"
              id="groupName"
              placeholder="Group Name"
            />
          </Label>
          <Button type="submit">Join Group</Button>
        </StyledWrapper>
      </Form>
    </StyledWrapper>
  );
}
