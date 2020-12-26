import { NhostAuthProvider, NhostApolloProvider } from "react-nhost";
import { auth } from "../utils/nhost";
import "../styles/tailwind.css";
import { ToastProvider } from "react-toast-notifications";

function MyApp({ Component, pageProps }) {
  return (
    <NhostAuthProvider auth={auth}>
      <NhostApolloProvider
        auth={auth}
        gqlEndpoint={`https://hasura-3eb16394.nhost.app/v1/graphql`}
      >
        <ToastProvider autoDismissTimeout="3000" placement="bottom-left">
          {/* <ProvideAuth> */}
          <Component {...pageProps} />
          {/* </ProvideAuth> */}
        </ToastProvider>
      </NhostApolloProvider>
    </NhostAuthProvider>
  );
}

export default MyApp;
