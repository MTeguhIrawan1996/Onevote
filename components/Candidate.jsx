import { useEffect, useState } from "react";
import Input from "./Input";
import { XCircleIcon } from "@heroicons/react/24/solid";

const Candidate = (props) => {
  const [candidate, setCandidate] = useState({
    name: "",
    key: 0,
    title: "",
  });

  // Kedua Setelah ditambah pasti ada perubahan di props.candidate dan si set candidate diatas dengan isi dari props dan juga akan berubah ketikan input di change
  useEffect(() => {
    setCandidate(props.candidate);
  }, [props.candidate]);

  // Ketiga setelah candidate diatas berubah maka akan memicu useEffect untuk melakukan submitCandidate dari data candidate didatas
  useEffect(() => {
    props.submitCandidate(candidate);
  }, [candidate]);

  return (
    <div className="flex flex-col justify-between items-center w-60 h-52 border-solid border-[1px] border-zinc-300 pb-4">
      <div
        className="self-end p-1 cursor-pointer"
        onClick={() => props.removeCandidateForm(candidate.key)}
      >
        <XCircleIcon className="h-6 w-6 text-zinc-300 hover:text-zinc-100 " />
      </div>
      <div className="flex justify-center items-center w-16 aspect-square bg-zinc-300 rounded-full">
        <span className="font-semibold text-2xl">{props.candidate.key}</span>
      </div>
      <div className="w-full flex flex-col px-3 gap-1">
        <label className="block text-sm font-bold text-[#05060f99] transition-color duration-300 delay-0 ease-cubic-bezier hover:text-[#05060fc2]">
          Nama Kandidat
        </label>
        <Input
          placeholder="Masukkan Nama Kandidat"
          type="text"
          className="w-full h-8"
          value={candidate.name}
          onChange={(e) => setCandidate({ ...candidate, name: e })}
        />
      </div>
    </div>
  );
};

export default Candidate;
