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
import { setOrUpdateUserData } from "@/firebase/firestore/model";
import { useAuthContext } from "../../../context/AuthContext";

const exampleGroups = ["GPHSB Group", "funemployment Group", "Quarantinos"];
const exampleGroups2 = ["Dogs", "Cats", "Squirrels"];

export default function Groups() {
  const router = useRouter();

  const { user } = useAuthContext();
  const userName = user?.displayName;
  const userEmail = user?.email;
  const userId = user?.uid;

  const [groupName, setGroupName] = useState("");

  const [userData, setUserData] = useState({
    userId: userId,
    user: userName,
    email: userEmail,
    bio: "",
    photoURL: "",
    currentGroup: groupName,
    listeningGroups: exampleGroups,
  });

  function handleGroup(event: SelectEvent) {
    const selectedGroup = event.target.value as string;
    setGroupName(selectedGroup);
  }

  function consoleLog() {
    console.log("userData:", userData);
  }

  const handleSubmit = async (event: ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (groupName === "") {
      alert("Please enter a group name");
    }
    if (!userData.listeningGroups.includes(groupName)) {
      setUserData({
        ...userData,
        currentGroup: groupName,
        listeningGroups: [...userData.listeningGroups, groupName],
      });
      await setOrUpdateUserData(userData, userName);
    }
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
            {userData.listeningGroups.map((group, index) => (
              <option key={index} value={group.split(" ").join("-")}>
                {group}
              </option>
            ))}
          </select>
          <button onClick={consoleLog}>Console log</button>
          <Label htmlFor="groupName">
            <Paragraph>Create New Group</Paragraph>
            <InputRectangle
              onChange={(e) => setGroupName(e.target.value)}
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
