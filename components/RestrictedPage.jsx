import Head from "next/head";
import Image from "next/image";
import LoginImage from "../public/assets/login.svg";
import Button from "./Button";
import { signIn } from "next-auth/react";

const RestrictedPage = () => {
  return (
    <>
      <Head>
        <title>Restricted Page</title>
      </Head>
      <div className="container mx-auto h-screen w-full px-14 flex flex-col justify-center items-center">
        <Image
          alt="Login"
          src={LoginImage}
          className="w-64 aspect-square max-md:w-60"
        />
        <div className="text-center py-6">
          <h1 className="text-2xl font-bold">Login Dulu Yah!</h1>
          <p>Untuk mengakses halaman ini, kamu wajib login terlebih dahulu</p>
        </div>
        <Button
          text="Login"
          className="font-semibold text-base w-[112px]"
          onClick={signIn}
        />
      </div>
    </>
  );
};

export default RestrictedPage;
