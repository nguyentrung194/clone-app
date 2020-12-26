import React, { useState } from "react";
import { auth } from "../utils/nhost";
import { useRouter } from "next/router";
import Link from "next/link";
import Head from "next/head";
import { useToasts } from "react-toast-notifications";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const { addToast } = useToasts();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    console.log("Handle submit");
    try {
      await auth.login(email, password);
      addToast("Login successfull!", {
        appearance: "success",
        autoDismiss: true,
      });
      router.push("/");
    } catch (error) {
      addToast(error.message, { appearance: "error", autoDismiss: true });
    }
  };
  return (
    <div className="container flex flex-col max-w-xl max-auto shadow p-4 my-12 mx-auto">
      <Head>
        <title>Login</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className="text-center uppercase text-gray-700 pb-4">Login</div>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col">
          <input
            className="border rounded px-2 py-1 my-2"
            type="text"
            autoFocus
            placeholder="Your email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <input
            className="border rounded px-2 py-1 my-2"
            type="password"
            autoFocus
            placeholder="Your password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <div className="flex justify-center">
            <button className="inline bg-indigo-700 text-white px-4 py-2 text-sm">
              Login
            </button>
          </div>
          <div className="pt-6 text-center text-gray-700">
            Don't have a account?{" "}
            <Link href="/register">
              <a className="text-indigo-700">Register</a>
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
}
