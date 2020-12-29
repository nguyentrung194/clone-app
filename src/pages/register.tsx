import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { auth } from "../utils/nhost";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [display_name, setDisplay_name] = useState("");
  const router = useRouter();
  async function handleSubmit(e: any) {
    e.preventDefault();
    console.log("Handle submit");
    try {
      await auth.register(email, password, { display_name });
      await auth.login(email, password);
      router.push("/");
    } catch (error) {
      alert("Register fail!");
    }
  }
  return (
    <div className="container flex flex-col max-w-xl max-auto shadow p-4 my-12 mx-auto">
      <Head>
        <title>Register</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className="text-center uppercase text-gray-700 pb-4">Register</div>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col">
          <input
            className="border rounded px-2 py-1 my-2"
            type="text"
            autoFocus
            placeholder="Your name"
            value={display_name}
            onChange={(e) => {
              setDisplay_name(e.target.value);
            }}
          />
          <input
            className="border rounded px-2 py-1 my-2"
            type="text"
            placeholder="Your email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <input
            className="border rounded px-2 py-1 my-2"
            type="password"
            placeholder="Your password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <div className="flex justify-center">
            <button className="inline bg-indigo-700 text-white px-4 py-2 text-sm">
              Register
            </button>
          </div>
          <div className="pt-6 text-center text-gray-700">
            Already have a account?
            <Link href="/login">
              <a className="text-indigo-700"> Login</a>
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
}
