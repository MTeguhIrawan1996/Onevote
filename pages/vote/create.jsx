import Image from "next/image";
import Head from "next/head";
import Navbar from "../../components/Navbar";
import HeaderImg from "../../public/assets/img-create-vote.svg";
import Input from "../../components/Input";
import { PlusIcon } from "@heroicons/react/24/solid";
import Button from "../../components/Button";
import ReactDataPicker, { registerLocale } from "react-datepicker";
import id from "date-fns/locale/id";
import Candidate from "../../components/Candidate";
import { useSession } from "next-auth/react";
import RestrictedPage from "../../components/RestrictedPage";
import { ShowAlert } from "../../components/Alter";
import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";

registerLocale("id", id);

const CreateVote = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [startDateTime, setStartDateTime] = useState(new Date());
  const [endDateTime, setEndDateTime] = useState(new Date());
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState();
  const [candidates, setCandidates] = useState([
    {
      name: "",
      key: 1,
      title: "",
    },
  ]);

  // Keempat setelah submit dengen useEffect maka candidates diatas akan dimaping dan diset berdasarkan key dan data kandidate dari element difile candidates atau dari cahnge input
  const submitCandidate = (candidate) => {
    setCandidates(
      candidates.map((c) => (c.key === candidate.key ? candidate : c))
    );
  };

  // Pertama form kandidat ditambah
  const handleAddCandidate = () => {
    const newCandidate = {
      name: "",
      key: candidates.length + 1,
      title: "",
    };
    if (candidates.length < 4) {
      setCandidates([...candidates, newCandidate]);
    }
  };

  const handleRemoveCandidate = (key) => {
    if (candidates.length > 1) {
      // list kandidat baru kecuali dengan key diatas
      const newCandidates = candidates.filter(
        (candidate) => candidate.key !== key
      );
      // renumber
      newCandidates.forEach((candidate, i) => {
        candidate.key = i + 1;
      });
      setCandidates(newCandidates);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validasi
    if (title === "") {
      ShowAlert({
        title: "Hmm",
        message: "Judul tidak boleh kosong",
      });
      return;
    }
    if (candidates.length < 2) {
      ShowAlert({
        title: "Hmm",
        message: "Minimal ada 2 kandidat",
      });
      return;
    }

    if (startDateTime > endDateTime) {
      ShowAlert({
        title: "Hmm",
        message: "Tanggal mulai tidak boleh lebih besar dari tanggal selesai",
      });
      return;
    }
    if (candidates.some((c) => c.name === "")) {
      ShowAlert({
        title: "Hmm",
        message: "Nama kandidat tidak boleh kosong",
      });
      return;
    }

    setLoading(true);
    axios
      .post("/api/vote", {
        title,
        startDateTime,
        endDateTime,
        candidate: candidates,
        publisher: session.user?.email,
      })
      .then(() => {
        ShowAlert({
          title: "Yeay!",
          message: "Voting berhasil dibuat",
        });
        router.push("/");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  if (!session && status !== "loading") {
    return <RestrictedPage />;
  }

  if (session) {
    return (
      <>
        <Head>
          <title>Create Voting</title>
        </Head>
        <Navbar />
        <div className="container flex flex-col justify-center items-start mx-auto pt-32 pb-8 w-full px-20 gap-16">
          <Image alt="create Vote" src={HeaderImg} width={284} height={198} />
          <div className="flex flex-col justify-start items-start gap-3 w-full">
            <h1 className="text-3xl font-bold max-[450px]:text-xl">
              Buat Voting Baru
            </h1>
            <h2 className="text-1xl font-normal">
              Silakan masukkan data yang dibutuhkan untuk membuat voting online
            </h2>
          </div>
          <form
            className="flex flex-col justify-center items-center gap-10 w-full"
            onSubmit={handleSubmit}
          >
            <div className="flex flex-col justify-start items-start gap-6 w-full">
              <h1 className="text-xl font-bold max-[450px]:text-lg">
                Detail Voting
              </h1>
              <div className="flex flex-col w-full gap-1 hover:text-[#05060fc2]">
                <label className="block text-sm font-bold text-[#05060f99] transition-color duration-300 delay-0 ease-cubic-bezier hover:text-[#05060fc2]">
                  Judul
                </label>
                <Input
                  type="text"
                  placeholder="Contoh: Voting Calon Gubernur"
                  className="w-[534px]"
                  onChange={(e) => setTitle(e)}
                  value={title}
                />
              </div>
              <div className="flex flex-col w-full gap-1 hover:text-[#05060fc2]">
                <label className="block text-sm font-bold text-[#05060f99] transition-color duration-300 delay-0 ease-cubic-bezier hover:text-[#05060fc2]">
                  Kapan dimuali?
                </label>
                <div className="inline-flex items-center max-md:flex-col max-md:items-start w-full max-w-4xl">
                  <ReactDataPicker
                    dateFormat={"Pp"}
                    locale={"id"}
                    showTimeSelect
                    selected={startDateTime}
                    minDate={new Date()}
                    onChange={(date) => date && setStartDateTime(date)}
                    className="border-solid border-2 border-transparent rounded-lg py-0 px-4 transition-border-color duration-300 delay-0 ease-cubic-bezier hover:outline-none hover:border-[#05060f] focus:outline-none focus:border-[#05060f] bg-zinc-300 h-10 w-full"
                  />
                  <span className="text-sm font-bold text-[#05060f99] p-3 max-md:p-0 max-md:py-2">
                    Sampai
                  </span>
                  <ReactDataPicker
                    dateFormat={"Pp"}
                    locale={"id"}
                    showTimeSelect
                    selected={endDateTime}
                    minDate={startDateTime}
                    onChange={(date) => date && setEndDateTime(date)}
                    className="border-solid border-2 border-transparent rounded-lg py-0 px-4 transition-border-color duration-300 delay-0 ease-cubic-bezier hover:outline-none hover:border-[#05060f] focus:outline-none focus:border-[#05060f] bg-zinc-300 h-10 w-full"
                  />
                </div>
              </div>
            </div>
            <div className="flex flex-col justify-start items-start gap-6 w-full mt-3">
              <h1 className="text-xl font-bold max-[450px]:text-lg">
                Kandidat
              </h1>
              <div className="flex flex-wrap justify-start items-start gap-6 w-full max-md:flex-col max-md:justify-start max-md:items-center">
                {/* Mapping candidate */}
                {candidates.map((data, index) => (
                  <Candidate
                    key={index}
                    candidate={data}
                    submitCandidate={submitCandidate}
                    removeCandidateForm={handleRemoveCandidate}
                  />
                ))}

                <div
                  className="flex justify-center items-center bg-zinc-300 w-24 h-20 text-zinc-100 hover:text-zinc-700 cursor-pointer transition-color duration-300 delay-0 ease-cubic-bezier"
                  onClick={handleAddCandidate}
                >
                  <PlusIcon className="h-10 w-10" />
                </div>
              </div>
            </div>
            <div className="flex w-full justify-end items-end mt-3 max-md:justify-center">
              <Button
                text="Buat Voting"
                className="font-semibold text-base"
                isLoading={loading}
              />
            </div>
          </form>
        </div>
      </>
    );
  }
};

export default CreateVote;
