import { NhostAuthProvider, NhostApolloProvider } from "react-nhost";
import { auth } from "utils/nhost.js";
import "../styles/tailwind.css";

function MyApp({ Component, pageProps }) {
  return (
    <NhostAuthProvider auth={auth}>
      <NhostApolloProvider
        auth={auth}
        gqlEndpoint={`https://hasura-6ec6d61a.nhost.app/v1/graphql`}
        headers={{
          role: "public",
        }}
      >
        <Component {...pageProps} />
      </NhostApolloProvider>
    </NhostAuthProvider>
  );
}

export default MyApp;
