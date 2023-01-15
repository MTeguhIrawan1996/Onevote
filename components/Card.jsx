import { LinkIcon, PencilIcon, TrashIcon } from "@heroicons/react/24/solid";
import React, { useEffect, useState } from "react";
import moment from "moment/moment";
import useSWR from "swr";
import { ShowAlert } from "./Alter";
import axios from "axios";
import Link from "next/link";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export const STATE_NOT_STARTED = "STATE_NOT_STARTED",
  STATE_STARTED = "STATE_STARTED",
  STATE_END = "STATE_END",
  STATE_LOADING = "STATE_LOADING";

const Card = () => {
  const { data: dataVotesApi, error } = useSWR("/api/vote", fetcher);
  const [votes, setVotes] = useState([]);
  const [currentState, setCurentState] = useState(STATE_LOADING);

  useEffect(() => {
    if (dataVotesApi && !error) {
      setVotes(dataVotesApi.data);
    }
  }, [dataVotesApi]);

  const handleDelete = (code) => {
    ShowAlert({
      title: "Warning",
      positiveBtnText: "Oke",
      negativeBtnText: "Tidak",
      message: "Yakin ingin menghapus data ini",
      async onPositiveClick() {
        try {
          await axios(`/api/vote/${code}`, {
            method: "DELETE",
          });
          ShowAlert({
            title: "Yeay Berhasil",
            message: "Data berhasil dihapus",
          });
          setVotes(votes?.filter((vote) => vote.code !== code));
        } catch (err) {
          ShowAlert({ title: "Gagal", message: "Data gagal dihapus" });
        }
      },
    });
  };

  const CardItem = ({ vote, handleDelete, index }) => {
    useEffect(() => {
      if (dataVotesApi && !error) {
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
    }, [dataVotesApi]);

    return (
      <div className="bg-black rounded-[0.75rem]">
        <div className="block box-border border-solid border-2 border-[#000000] rounded-[0.75em] bg-white px-4 pt-2 text-black -translate-y-1 -translate-x-1 hover:-translate-y-[0.35rem] hover:-translate-x-[0.35rem] transition-transform ease-in duration-[0.1s]">
          <div className="flex flex-col justify-start items-start font-semibold text-base max-sm:text-xs">
            <div className="flex justify-between items-start w-full px-2">
              <span>No.{index + 1}</span>
              <div className="flex flex-col justify-center items-center">
                <span>Status Voting</span>
                {currentState === STATE_NOT_STARTED && (
                  <span className="text-xs font-light font-mono">
                    Belum dimulai
                  </span>
                )}
                {currentState === STATE_STARTED && (
                  <span className="text-xs font-light font-mono">
                    Sedang berlangsung
                  </span>
                )}
                {currentState === STATE_END && (
                  <span className="text-xs font-light font-mono">
                    Voting Berakhir
                  </span>
                )}
              </div>
              <span>{vote.code}</span>
            </div>
            <div className="border-2 border-solid border-black w-full px-3 py-2 mt-4 rounded-[0.75em]">
              <div className="flex justify-between items-start">
                <div className="flex-1 flex flex-col justify-start items-start gap-1">
                  <span>Judul</span>
                  <p className="font-mono font-light">{vote.title}</p>
                </div>
                <div className="flex-1 flex flex-col justify-start items-end gap-1">
                  <span>Kandidat</span>
                  <div className="flex flex-wrap justify-end items-end w-full font-mono font-light gap-1">
                    {vote.candidate.map((c, i) => (
                      <React.Fragment key={i}>
                        <p>{c.name}</p>
                        {i < vote.candidate.length - 1 ? <p>Vs</p> : ""}
                      </React.Fragment>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex justify-between items-center mt-8">
                <div className="flex flex-col items-start max-md:items-center justify-start gap-1">
                  <span>Mulai</span>
                  <p className="font-mono font-light max-md:text-center">
                    {moment(vote.startDateTime).format("DD MMM YYYY, h:mm a")}
                  </p>
                </div>
                <div className="flex flex-col items-end max-md:items-center justify-start gap-1">
                  <span>Selesai</span>
                  <p className="font-mono font-light max-md:text-center">
                    {moment(vote.endDateTime).format("DD MMM YYYY, h:mm a")}
                  </p>
                </div>
              </div>
            </div>
            <div className="flex justify-center gap-6 items-center w-full py-4">
              <Link href={`/participant/${vote.code}`}>
                <LinkIcon className="h-6 w-6 text-zinc-700 hover:text-zinc-400" />
              </Link>
              {currentState === STATE_NOT_STARTED && (
                <Link href={`/vote/${vote.code}`}>
                  <PencilIcon className="h-6 w-6 text-zinc-700 hover:text-zinc-400" />
                </Link>
              )}
              <button
                className="bg-transparent"
                onClick={() => handleDelete(vote.code)}
              >
                <TrashIcon className="h-6 w-6 text-zinc-700 hover:text-zinc-400" />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    votes?.length > 0 && (
      <div className="flex justify-center flex-col items-center pt-32 pb-8 w-4/5 gap-2">
        <h1 className="py-5 text-2xl font-semibold text-start w-4/5 max-md:w-full">
          Buat Vote Saya
        </h1>
        <div className="grid grid-cols-1 gap-10 w-4/5 max-sm:grid-cols-1 max-md:w-full">
          {/* Looping disini */}
          {votes?.map((vote, i) => (
            <CardItem
              vote={vote}
              key={i}
              handleDelete={handleDelete}
              index={i}
            />
          ))}
        </div>
      </div>
    )
  );
};

export default Card;
