// import { useMutation } from "@apollo/client";
import { Layout, Main } from "components/layout";
import Head from "next/head";
import React, { useState } from "react";

// export const INSERT_POST = gql``;

export default function New() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  // const [createPost] = useMutation(INSERT_POST);

  async function handleSubmit(e: any) {
    e.preventDefault();
    console.log("Create post");
  }

  return (
    <Layout>
      <>
        <Head>
          <title>Create post</title>
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
          />
        </Head>
        <Main>
          <form onSubmit={handleSubmit}>
            <div className="py-2">
              <input
                type="text"
                className="border rounded px-2 py-1 my-2 w-full"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="py-2">
              <textarea
                placeholder="Description"
                value={description}
                className="border rounded px-2 py-1 my-2 w-full"
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className="py-2">
              <button className="inline bg-indigo-700 text-white px-4 py-2 text-sm">
                Create post
              </button>
            </div>
          </form>
        </Main>
      </>
    </Layout>
  );
}
