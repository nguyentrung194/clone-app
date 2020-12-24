import { Layout, Main } from "components/layout";
import Link from "next/link";
import { useAuth } from "react-nhost";
export default function Home() {
  const { signedIn } = useAuth();
  if (!signedIn && !signedIn) {
    return (
      <Layout>
        <div>Let login</div>
      </Layout>
    );
  }
  return (
    <Layout>
      <Main>
        <div>
          <Link href="/transaction">
            <a>Transaction page</a>
          </Link>
        </div>
      </Main>
    </Layout>
  );
}
