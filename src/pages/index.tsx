import { Layout, Main } from "components/layout";
import Link from "next/link";
import Head from "next/head";
import { useAuth } from "react-nhost";
export default function Home() {
  const { signedIn } = useAuth();
  if (!signedIn && !signedIn) {
    return (
      <Layout>
        <>
          <Head>
            <title>Home</title>
            <meta
              name="viewport"
              content="initial-scale=1.0, width=device-width"
            />
          </Head>
          <Main>
            <div>Let login</div>
          </Main>
        </>
      </Layout>
    );
  }
  return (
    <Layout>
      <>
        <Head>
          <title>Home</title>
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
          />
        </Head>
        <Main>
          <div>
            <Link href="/transaction">
              <a>Transaction page</a>
            </Link>
          </div>
        </Main>
      </>
    </Layout>
  );
}
