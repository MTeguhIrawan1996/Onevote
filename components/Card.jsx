import Link from "next/link";
import { LinkIcon, TrashIcon } from "@heroicons/react/24/solid";
import useVotes from "../lib/useVote";
import React, { useEffect, useState } from "react";
import moment from "moment/moment";

const Card = () => {
  const { data: dataVotesApi, error, isLoading } = useVotes();
  const [votes, setVotes] = useState([]);

  useEffect(() => {
    if (dataVotesApi) {
      setVotes(dataVotesApi.data);
    }
  }, [dataVotesApi]);
  return (
    votes.length > 0 && (
      <div className="flex justify-center flex-col items-center pt-32 pb-8 w-4/5 gap-2">
        <h1 className="py-5 text-2xl font-semibold">Buat Vote Saya</h1>
        <div className="grid grid-cols-1 gap-10 w-4/5 max-sm:grid-cols-1 max-md:w-full">
          {/* Looping disini */}
          {votes.map((vote, i) => (
            <div className="bg-black rounded-[0.75rem]" key={i}>
              <div className="block box-border border-solid border-2 border-[#000000] rounded-[0.75em] bg-white px-4 pt-2 text-black -translate-y-1 -translate-x-1 hover:-translate-y-[0.35rem] hover:-translate-x-[0.35rem] transition-transform ease-in duration-[0.1s]">
                <div className="flex flex-col justify-start items-start font-semibold text-base max-sm:text-xs">
                  <div className="flex justify-between w-full px-2">
                    <span>No.{i + 1}</span>
                    <span>{vote.code}</span>
                  </div>
                  <div className="border-2 border-solid border-black w-full px-3 py-2 mt-4 rounded-[0.75em]">
                    <div className="flex justify-between items-center">
                      <div className="flex-1 flex flex-col justify-start items-start gap-1">
                        <span>Judul</span>
                        <p className="font-mono font-light">{vote.title}</p>
                      </div>
                      <div className="flex-1 flex flex-col justify-start items-end gap-1">
                        <span>Kandidat</span>
                        <div
                          className="flex justify-end items-end w-full font-mono font-light gap-1"
                          key={i}
                        >
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
                          {moment(vote.startDateTime).format(
                            "DD MMM YYYY, h:mm a"
                          )}
                        </p>
                      </div>
                      <div className="flex flex-col items-end max-md:items-center justify-start gap-1">
                        <span>Selesai</span>
                        <p className="font-mono font-light max-md:text-center">
                          {moment(vote.endDateTime).format(
                            "DD MMM YYYY, h:mm a"
                          )}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-center gap-6 items-center w-full py-4">
                    <Link href="#">
                      <LinkIcon className="h-6 w-6 text-zinc-700 hover:text-zinc-400" />
                    </Link>
                    <Link href="#">
                      <TrashIcon className="h-6 w-6 text-zinc-700 hover:text-zinc-400" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  );
};

export default Card;
