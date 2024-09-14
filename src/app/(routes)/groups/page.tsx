"use client";
import { useRouter } from "next/navigation";
import { ChangeEvent, useState, useEffect } from "react";
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
import { useAuthContext } from "../../../context/AuthContext";
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";

const db = getFirestore();

export default function Groups() {
  const router = useRouter();
  const { user } = useAuthContext();
  const [groupName, setGroupName] = useState("");
  const [userGroups, setUserGroups] = useState<string[]>([]);
  const [allGroups, setAllGroups] = useState<string[]>([]);

  useEffect(() => {
    if (user) {
      fetchUserGroups();
      fetchAllGroups();
    }
  }, [user]);

  const fetchUserGroups = async () => {
    if (!user) return;
    const userGroupsRef = doc(db, "userGroups", user.uid);
    const userGroupsSnap = await getDoc(userGroupsRef);
    if (userGroupsSnap.exists()) {
      const groups = Object.keys(userGroupsSnap.data());
      setUserGroups(groups);
    }
  };

  const fetchAllGroups = async () => {
    const groupsRef = collection(db, "groups");
    const groupsSnap = await getDocs(groupsRef);
    const groups = groupsSnap.docs.map((doc) => doc.id);
    setAllGroups(groups);
  };

  const handleGroupSelect = (event: SelectEvent) => {
    const selectedGroup = event.target.value as string;
    setGroupName(selectedGroup);
  };

  const handleCreateGroup = async (event: ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!user || !groupName.trim()) return;

    // Create new group
    await setDoc(doc(db, "groups", groupName), {
      name: groupName,
      createdAt: new Date().toISOString(),
      createdBy: user.uid,
    });

    // Add user to group
    await joinGroup(groupName);

    setGroupName("");
    fetchAllGroups();
  };

  const joinGroup = async (group: string) => {
    if (!user) return;

    // Add group to user's groups
    const userGroupsRef = doc(db, "userGroups", user.uid);
    await setDoc(userGroupsRef, { [group]: true }, { merge: true });

    // Add user to group members
    const groupMembersRef = doc(db, "groupMembers", group);
    await setDoc(groupMembersRef, { [user.uid]: true }, { merge: true });

    fetchUserGroups();
  };

  const handleJoinGroup = async () => {
    if (!groupName) {
      alert("Please select a group");
      return;
    }
    await joinGroup(groupName);
    router.push(`/chat/${groupName}`);
  };

  return (
    <StyledWrapper>
      <Subtitle>Groups</Subtitle>
      <Form onSubmit={handleCreateGroup}>
        <StyledWrapper justifyContent="space-between" gap="2rem">
          <Label htmlFor="group-select">
            <Paragraph>Choose a group to join:</Paragraph>
            <select
              name="groups"
              id="group-select"
              onChange={handleGroupSelect}
              value={groupName}
            >
              <option value="">Select a group</option>
              {allGroups.map((group) => (
                <option key={group} value={group}>
                  {group}
                </option>
              ))}
            </select>
          </Label>
          <Button type="button" onClick={handleJoinGroup}>
            Join Group
          </Button>

          <Label htmlFor="newGroupName">
            <Paragraph>Create New Group</Paragraph>
            <InputRectangle
              onChange={(e) => setGroupName(e.target.value)}
              type="text"
              name="newGroupName"
              id="newGroupName"
              placeholder="New Group Name"
              value={groupName}
            />
          </Label>
          <Button type="submit">Create Group</Button>
        </StyledWrapper>
      </Form>

      <Subtitle>Your Groups</Subtitle>
      <ul>
        {userGroups.map((group) => (
          <li key={group}>
            <Button onClick={() => router.push(`/chat/${group}`)}>
              {group}
            </Button>
          </li>
        ))}
      </ul>
    </StyledWrapper>
  );
}
