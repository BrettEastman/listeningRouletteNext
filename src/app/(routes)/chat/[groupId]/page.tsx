// File: app/chat/[groupId]/page.tsx

"use client";

import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { useAuthContext } from "@/context/AuthContext";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import ChatRoom from "@/components/ChatRoom"; // Assuming you've moved the ChatRoom component to a separate file

const db = getFirestore();

export default function ChatPage() {
  const { groupId } = useParams();
  const { user } = useAuthContext();
  const [isGroupMember, setIsGroupMember] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkGroupMembership = async () => {
      if (!user || !groupId) return;

      const groupMembersRef = doc(db, "groupMembers", groupId as string);
      const groupMembersSnap = await getDoc(groupMembersRef);

      if (groupMembersSnap.exists()) {
        const members = groupMembersSnap.data();
        setIsGroupMember(!!members[user.uid]);
      }

      setLoading(false);
    };

    checkGroupMembership();
  }, [user, groupId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!isGroupMember) {
    return <div>You are not a member of this group.</div>;
  }

  return (
    <div>
      <h1>Chat Room: {groupId}</h1>
      <ChatRoom groupId={groupId as string} />
    </div>
  );
}
