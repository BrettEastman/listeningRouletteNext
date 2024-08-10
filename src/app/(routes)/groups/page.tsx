"use client";
import { useRouter } from "next/navigation";
import { useEffect, ChangeEvent } from "react";
import {
  Button,
  Form,
  InputRectangle,
  Label,
  Paragraph,
  StyledWrapper,
  Subtitle,
} from "../../styles";
import { useGroupStore } from "@/store/useGroupStore";
import { getUserSnapshot } from "@/firebase/firestore/model";
import { useAuthContext } from "../../../context/AuthContext";

export default function Groups() {
  const router = useRouter();
  const { user } = useAuthContext();

  const { groupName, setGroupName, userData, setUserData, handleGroup } =
    useGroupStore();

  useEffect(() => {
    const fetchSnapshot = async () => {
      try {
        const { success, message, error, res } = await getUserSnapshot();
        if (error) {
          console.error(message);
        } else if (res) {
          console.log(success);
          console.log("res from useEffect:", res);
          setUserData(res);
        }
      } catch (error) {
        console.error(error);
      }
    };
    if (user == null) {
      return router.push("/signin");
    } else {
      fetchSnapshot();
      console.log("snapshot fetched");
    }
  }, [router, setUserData, user]);

  const handleSubmit = async (event: ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (groupName === "") {
      alert("Please enter a group name");
      return;
    }

    handleGroup(groupName);
    setUserData({
      userId: user?.uid,
      user: user?.displayName,
      email: user?.email,
    });
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
          <select
            name="groups"
            id="group-select"
            onChange={(e) => setGroupName(e.target.value)}
          >
            {userData.listeningGroups.map((group, index) => (
              <option key={index} value={group.split(" ").join("-")}>
                {group}
              </option>
            ))}
          </select>
          <button
            type="button"
            onClick={() => console.log("userData:", userData)}
          >
            Console log
          </button>
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
