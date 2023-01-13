import moment from "moment";
import Head from "next/head";
import { useRouter } from "next/router";
import Navbar from "../../components/Navbar";
import Timer from "../../components/Timer";
import CandidateItem from "../../components/CandidateItem";
import Button from "../../components/Button";
import { ShowAlert } from "../../components/Alter";
import RestrictedPage from "../../components/RestrictedPage";
import { useSession } from "next-auth/react";
import useSWR from "swr";
import { useEffect, useState } from "react";
import axios from "axios";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export const STATE_NOT_STARTED = "STATE_NOT_STARTED",
  STATE_STARTED = "STATE_STARTED",
  STATE_END = "STATE_END",
  STATE_LOADING = "STATE_LOADING";

const DetailParticipant = () => {
  const router = useRouter();
  const { code } = router.query;
  const { data: session, status } = useSession();
  const [currentState, setCurentState] = useState(STATE_LOADING);
  const [selectedCandidate, setSelectedCandidate] = useState(null);

  const {
    data: dataVoteApi,
    mutate,
    error,
  } = useSWR(code ? `/api/vote/${code}` : null, code ? fetcher : null);

  const { data: dataParticipantApi, mutate: mutateParticipantApi } = useSWR(
    code ? `/api/participant/${code}` : null,
    code ? fetcher : null
  );

  useEffect(() => {
    if (dataVoteApi && !error) {
      const vote = dataVoteApi?.data;
      if (currentState === STATE_END) {
        return;
      }
      const start = moment(vote?.startDateTime);
      const end = moment(vote?.endDateTime);

      const interval = setInterval(async () => {
        const now = moment();
        if (now.isBefore(start)) {
          setCurentState(STATE_NOT_STARTED);
        } else if (now.isAfter(start) && now.isBefore(end)) {
          setCurentState(STATE_STARTED);
        } else if (now.isAfter(end)) {
          setCurentState(STATE_END);
        }
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [dataVoteApi]);

  useEffect(() => {
    if (dataParticipantApi && dataVoteApi) {
      const candidate = dataVoteApi?.data?.candidate?.find(
        (c) => c.name === dataParticipantApi?.data?.candidate
      );
      if (candidate) {
        setSelectedCandidate(candidate);
      }
    }
  }, [dataParticipantApi, dataVoteApi]);

  const handleVote = (data) => {
    if (
      !dataParticipantApi?.data &&
      dataVoteApi?.data?.publisher !== session.user?.email
    ) {
      if (currentState === STATE_STARTED) {
        setSelectedCandidate(data);
      }
    }
  };
  const handleSubmit = () => {
    if (selectedCandidate) {
      ShowAlert({
        title: "Yeay 😊",
        positiveBtnText: "Ya Saya yakin",
        onPositiveClick: async () => {
          try {
            await axios.post(`/api/participant/${dataVoteApi?.data?.code}`, {
              candidate: selectedCandidate?.name,
            });
            mutate();
            mutateParticipantApi();
            ShowAlert({
              title: "Voting Terkirim 😊",
              message: "Terima kasih atas partisipasi anda",
            });
          } catch (err) {
            ShowAlert({
              title: "Voting Gagal ❌",
              message: "Coba Beberapa saat lagi",
            });
          }
        },
        message: `Yakin ingin mengirim vote kandidat ${selectedCandidate?.name}`,
      });
    } else {
      ShowAlert({
        title: "Hmm ❌",
        message: "Vota gagal pilih salah satu kandidat",
      });
    }
  };

  // if (status === "loading") {
  //   return <Loading />;
  // }

  if (!session && status !== "loading") {
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
          {dataVoteApi?.data?.title}
        </h1>
        {/* Timer */}
        <Timer
          currentState={currentState}
          start={dataVoteApi?.data?.startDateTime}
          end={dataVoteApi?.data?.endDateTime}
        />

        {/* KandiateItem */}
        {dataVoteApi?.data?.candidate.map((data, i) => (
          <CandidateItem
            key={i}
            data={data}
            selected={selectedCandidate?.name === data.name}
            onClick={() => {
              handleVote(data);
            }}
            percentage={
              data.vote ? (data.vote / dataVoteApi?.data?.totalVotes) * 100 : 0
            }
          />
        ))}
        {session?.user?.email !== dataVoteApi?.data?.publisher &&
          !dataParticipantApi?.data &&
          currentState === STATE_STARTED && (
            <Button
              text="Kirim vote saya"
              className="font-semibold text-base w-[190px]"
              onClick={() => handleSubmit()}
            />
          )}
        {dataParticipantApi?.data && (
          <span className="bg-zinc-100 py-2 px-3 rounded-md">
            Kamu sudah memilih, dan tidak diperbolehkan mengganti pilihan
          </span>
        )}

        {session?.user?.email === dataVoteApi?.data?.publisher &&
          currentState !== STATE_END && (
            <span className="bg-zinc-100 py-2 px-3 rounded-md">
              Pembuat vote tidak boleh melakukan voting
            </span>
          )}
      </div>
    </>
  );
};

export default DetailParticipant;
