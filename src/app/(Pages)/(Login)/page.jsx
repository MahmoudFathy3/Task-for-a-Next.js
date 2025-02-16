import Login from "@/Components/Login/Login";
import Head from "next/head";

export const metadata = {
  title: "Login Page",
  description: "Log in to your account on our shopping platform.",
};

export default function LoginPage() {
  return (
    <>
      <Head>
        <link rel="icon" href="/public/Images/favicon.png" />
      </Head>
      <Login />
    </>
  );
}
