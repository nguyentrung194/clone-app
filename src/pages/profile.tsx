import { useQuery } from "@apollo/client";
import { GET_USER_DATA } from "graphql/schema";
import React from "react";
import { useAuth } from "react-nhost";
import { Layout } from "../components/layout";
import { auth } from "../utils/nhost";

export default function Profile() {
  const { signedIn } = useAuth();
  const user_id = signedIn && auth.getClaim("x-hasura-user-id");
  const { data, error, loading } = useQuery(GET_USER_DATA, {
    variables: {
      user_id,
    },
  });
  if (loading && !data) {
    return <div>loading...</div>;
  }
  if (error && !data) {
    return <div>{error.message}</div>;
  }
  const { user } = data;
  console.log(data);
  return (
    <Layout>
      <div>
        <span>Name: {user.display_name}</span>
        <p>Account number: {user.account_number}</p>
        <p>Balance: {user.balance}</p>
      </div>
    </Layout>
  );
}
