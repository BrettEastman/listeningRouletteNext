"use client";

import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { useAuthContext } from "@/context/AuthContext";
import { doc, getDoc } from "firebase/firestore";
import ChatRoom from "@/components/ChatRoom";
import { db } from "@/firebase/config";

export default function ChatPage() {
  const { groupName } = useParams();
  const { user } = useAuthContext();
  const [isGroupMember, setIsGroupMember] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkGroupMembership = async () => {
      if (!user || !groupName) return;
      const groupMembersRef = doc(db, "groupMembers", groupName as string);
      const groupMembersSnap = await getDoc(groupMembersRef);
      if (groupMembersSnap.exists()) {
        const members = groupMembersSnap.data();
        setIsGroupMember(!!members[user.uid]);
      }
      setLoading(false);
    };
    checkGroupMembership();
  }, [user, groupName]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!isGroupMember) {
    return <div>You are not a member of this group.</div>;
  }

  return (
    <div>
      <h1>Chat Room: {groupName}</h1>
      <ChatRoom groupName={groupName as string} />
    </div>
  );
}
