import { NhostAuthProvider, NhostApolloProvider } from "react-nhost";
import { auth } from "../utils/nhost";
import "../styles/tailwind.css";

function MyApp({ Component, pageProps }) {
  return (
    <NhostAuthProvider auth={auth}>
      <NhostApolloProvider
        auth={auth}
        gqlEndpoint={`https://hasura-3eb16394.nhost.app/v1/graphql`}
      >
        {/* <ProvideAuth> */}
        <Component {...pageProps} />
        {/* </ProvideAuth> */}
      </NhostApolloProvider>
    </NhostAuthProvider>
  );
}

export default MyApp;
