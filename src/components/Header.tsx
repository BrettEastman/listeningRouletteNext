import { useRouter } from "next/navigation";
import { signOutOfApp } from "@/firebase/auth/api";
import { useAuthContext } from "@/context/AuthContext";

export default function Header() {
  const router = useRouter();
  const signOutOfAppButton = () => {
    signOutOfApp();
    router.push("/");
  };

  const { user } = useAuthContext();

  return (
    <header>
      <h1>{`user: ${user}`}</h1>
    </header>
  );
}
