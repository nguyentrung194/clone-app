import { useRouter } from "next/router";
import React from "react";
import { auth } from "utils/nhost";
import { useAuth } from "react-nhost";
import Link from "next/link";
import { gql, useQuery } from "@apollo/client";

const GET_USER_DATA = gql`
  query getUserData($user_id: uuid!) {
    user: users_by_pk(id: $user_id) {
      id
      display_name
    }
  }
`;

export function UserHeader() {
  const router = useRouter();
  const { loading, error, data } = useQuery(GET_USER_DATA, {
    variables: {
      user_id: auth.getClaim("x-hasura-user-id"),
    },
  });
  if (error && !data) {
    console.log(error);
    return <div>Error...</div>;
  }
  if (loading && !data) {
    return <div>Loading...</div>;
  }
  const { user } = data;
  return (
    <div className="flex flex-row">
      <div className="pr-2">
        <Link href="/new">
          <a>Create post</a>
        </Link>
      </div>
      <div>
        {user.display_name} /{" "}
        <span
          onClick={() => {
            auth.logout();
            router.push("/login");
          }}
          className="cursor-pointer"
        >
          Logout
        </span>
      </div>
    </div>
  );
}

export function Header() {
  const { signedIn } = useAuth();
  return (
    <div className="flex items-center justify-between bg-indigo-700 text-white p-4">
      <div>Logo</div>
      <div className="flex items-center">
        {signedIn && signedIn ? (
          <>
            <UserHeader />
          </>
        ) : (
          <>
            <div className="flex ">
              Anonymous /{" "}
              <Link href="/login">
                <a className="px-2">Login</a>
              </Link>
              <Link href="/register">
                <a>Register</a>
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

interface ChildProps {
  children: React.ReactElement;
}

export function Main({ children }: ChildProps) {
  return <div className="container mx-auto px-4">{children}</div>;
}

export function Layout({ children }: ChildProps) {
  return (
    <div>
      <Header />
      {children}
    </div>
  );
}
