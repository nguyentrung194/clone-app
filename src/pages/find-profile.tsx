import { useQuery } from "@apollo/client";
import { GET_USER_DATA_BY_ACCOUNT_NUMBER } from "graphql/schema";
import Head from "next/head";
import React, { useState } from "react";
import { Layout } from "../components/layout";

export default function FindProfile() {
  const [search, setSearch] = useState("0");

  const [searchValue, setSearchValue] = useState("0");

  const { data, loading } = useQuery(GET_USER_DATA_BY_ACCOUNT_NUMBER, {
    variables: {
      account_number: search,
    },
  });

  if (loading && !data) {
    console.log("loading...!");
  }
  let userName = data?.users[0]?.display_name;
  async function handleSubmit(e: any) {
    e.preventDefault();
    setSearch(searchValue);
  }

  return (
    <Layout>
      <div className="container flex flex-col max-w-xl max-auto shadow p-4 my-12 mx-auto">
        <Head>
          <title>Find profile</title>
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
          />
        </Head>
        <div className="text-center uppercase text-gray-700 pb-4">
          Find profile
        </div>
        <form className="flex flex-col" onSubmit={handleSubmit}>
          <input
            className="border rounded px-2 py-1 my-2"
            type="text"
            autoFocus
            placeholder="Search by title"
            value={searchValue}
            onChange={(e) => {
              setSearchValue(e.target.value);
            }}
          />
          <div className="flex justify-center">
            <button className="inline bg-indigo-700 text-white px-4 py-2 text-sm">
              Find profile
            </button>
          </div>
        </form>
        <h1>{userName}</h1>
      </div>
    </Layout>
  );
}
