import Head from "next/head";
import { useRouter } from "next/router";
import Navbar from "../../components/Navbar";
import Timer from "../../components/Timer";
import CandidateItem from "../../components/CandidateItem";
import Button from "../../components/Button";
import { ShowAlert } from "../../components/Alter";
import RestrictedPage from "../../components/RestrictedPage";
import { useSession } from "next-auth/react";

const DetailParticipant = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const { code } = router.query;

  if (!session) {
    return <RestrictedPage />;
  }

  return (
    <>
      <Head>
        <title>Mulai Voting</title>
      </Head>
      <Navbar />
      <div className="container mx-auto flex flex-col justify-center items-center pt-32 pb-8 gap-9">
        <h1 className="text-4xl font-semibold max-[450px]:text-2xl">
          Pemilihan Gubernur
        </h1>
        {/* Timer */}
        <Timer />

        {/* KandiateItem */}
        <CandidateItem />
        <CandidateItem />
        <CandidateItem />

        <Button
          text="Kirim vote saya"
          className="font-semibold text-base w-[190px]"
          onClick={() =>
            ShowAlert({
              title: "Yeay",
              positiveBtnText: "Kirim",
              onPositiveClick() {},
              message: "Yakin ingin mengirim vote",
            })
          }
        />
      </div>
    </>
  );
};

export default DetailParticipant;
