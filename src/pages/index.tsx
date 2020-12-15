import { Layout } from "components/layout";
import { useRouter } from "next/router";
import { useAuth } from "react-nhost";
export default function Home() {
  const router = useRouter();
  const signedIn = useAuth();
  if (!signedIn) {
    router.push("/login");
  }
  return (
    <Layout>
      <div>Home</div>
    </Layout>
  );
}
