import Head from "next/head";
import styles from "../styles/Home.module.css";
import Navbar from "../components/Navbar";
import Header from "../components/Header";
import Card from "../components/Card";

export default function Home() {
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
        <Card />
      </div>
    </>
  );
}