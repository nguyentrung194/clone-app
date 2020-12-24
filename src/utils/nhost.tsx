import React, { createContext, useContext, useEffect, useState } from "react";
import nhost from "nhost-js-sdk";
import { LoginData } from "nhost-js-sdk/dist/types";

const config = {
  base_url: "https://backend-3eb16394.nhost.app",
  ssr: typeof window === "undefined",
};

nhost.initializeApp(config);

const auth = nhost.auth();
const storage = nhost.storage();

// useAuth hooks
// need fix
// it's not working
export interface AuthContextProps {
  state: {
    initializing: boolean;
    user: { user_id: string } | null;
    getClaims: string | null;
  };
  signin: (email: string, password: string) => Promise<LoginData>;
  signout: () => Promise<void>;
}

// @ts-ignore
const authContext = createContext<AuthContextProps>(null);

export interface ProvideAuthProps {
  children: React.ReactNode;
}

function useProvideAuth() {
  const [state, setState] = useState<{
    initializing: boolean;
    user: null;
    getClaims: string | null;
  }>({
    initializing: true,
    user: null,
    getClaims: null,
  });

  async function onChange(user: any) {
    console.log("auth state changed!");
    console.log(user);
    if (user) {
      const user_id: string | null = auth.getClaim("x-hasura-user-id");

      setState({ initializing: false, user, getClaims: user_id });
    } else {
      setState({
        ...state,
        initializing: false,
        user: null,
        getClaims: null,
      });
    }
  }

  const signin = (email: string, password: string) => {
    return auth.login(email, password);
  };

  const signout = () => {
    return auth.logout();
  };

  useEffect(() => {
    auth.onAuthStateChanged(onChange);
  }, []);

  return {
    state,
    signin,
    signout,
  };
}

export function ProvideAuth({ children }: ProvideAuthProps) {
  const authP = useProvideAuth();
  return (
    <authContext.Provider value={authP}> {children} </authContext.Provider>
  );
}

export const useAuth = () => {
  return useContext(authContext);
};

// end useAuth hooks

export { auth, storage };
