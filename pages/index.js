import Head from "next/head";
import styles from "../styles/Home.module.css";
import Navbar from "../components/Navbar";
import Header from "../components/Header";
import Card from "../components/Card";
import { useSession } from "next-auth/react";
import { EyeIcon, FaceSmileIcon } from "@heroicons/react/24/solid";

export default function Home() {
  const { data: session } = useSession();
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <div className="container flex flex-col justify-center items-center mx-auto pt-32 pb-8 w-full">
        <Header />
        {session && <Card />}
      </div>
      <footer className="w-full border-solid border-t-2 border-zinc-300 mt-20 py-1 flex justify-center items-center">
        <div className="flex w-4/5 justify-center items-center gap-1 text-base font-semibold max-md:text-xs">
          <p>Created with</p>
          <FaceSmileIcon className="h-6 w-6 text-pink-400 hover:text-zinc-400" />{" "}
          <p>by</p>
          <p>Muhammad Teguh Irawan</p>
        </div>
      </footer>
    </>
  );
}
