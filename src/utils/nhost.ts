import nhost from "nhost-js-sdk";

const config = {
  base_url: "https://backend-6ec6d61a.nhost.app",
  ssr: typeof window === "undefined",
};

nhost.initializeApp(config);

const auth = nhost.auth();
const storage = nhost.storage();

export { auth, storage };
