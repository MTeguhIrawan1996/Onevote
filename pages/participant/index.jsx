import Head from "next/head";
import Image from "next/image";
import ParticipantImage from "../../public/assets/partisipan.svg";
import Input from "../../components/Input";
import Button from "../../components/Button";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import RestrictedPage from "../../components/RestrictedPage";
// import Loading from "../../components/Loading";
import { ShowAlert } from "../../components/Alter";
import axios from "axios";

const Participant = () => {
  const { data: session, status } = useSession();
  const [code, setCode] = useState("");
  const router = useRouter();

  const handleSubmit = async () => {
    if (code === "") {
      ShowAlert({
        title: "Hmm",
        message: "Code tidak boleh kosong",
      });
      return;
    }
    try {
      await axios.get(`/api/vote/${code}`);
      router.push(`/participant/${code}`);
    } catch (err) {
      if (err.response.status === 404) {
        ShowAlert({
          title: "Hmm",
          message: "Kode yang anda masukkan salah",
        });
      }
      return;
    }
  };

  // if (status === "loading") {
  //   return <Loading />;
  // }

  if (!session && status !== "loading") {
    return <RestrictedPage />;
  }

  if (session)
    return (
      <>
        <Head>
          <title>Participant</title>
        </Head>
        <div className="container mx-auto flex flex-col justify-center h-screen w-full items-center gap-4 px-14">
          <Image
            alt="Participant"
            src={ParticipantImage}
            width={320}
            height={280}
            className="max-md:w-60"
          />
          <h1 className="text-2xl font-bold">Ikutan Voting</h1>
          <p className="text-sm max-md:text-xs font-bold w-2/4 max-md:w-11/12 text-center">
            Untuk ikutan voting, kamu harus memasukkan kode voting yang sudah di
            berikan panitia/penyelenggara
          </p>
          <Input
            type="text"
            placeholder="Masukkan kode voting"
            className="w-[371px]"
            onChange={setCode}
            value={code}
          />
          <div className="flex flex-col w-full justify-center items-center pt-1 gap-2">
            <Button
              text="Lanjutkan"
              className="font-semibold text-base w-[371px]"
              onClick={handleSubmit}
            />
            <Link
              href="/"
              className="font-semibold text-base hover:text-zinc-400 transition-colors duration-300 delay-0 ease-cubic-bezier"
            >
              Kembali
            </Link>
          </div>
        </div>
      </>
    );
};

export default Participant;
