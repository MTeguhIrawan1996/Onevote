import Link from "next/link";
import { LinkIcon, TrashIcon } from "@heroicons/react/24/solid";

const Card = () => {
  return (
    <div className="flex justify-center flex-col items-center pt-32 pb-8 w-4/5 gap-2">
      <h1 className="py-5 text-2xl font-semibold">Buat Vote Saya</h1>
      <div className="grid grid-cols-1 gap-10 w-4/5 max-sm:grid-cols-1 max-md:w-full">
        {/* Looping disini */}
        <div className="bg-black rounded-[0.75rem]">
          <div className="block box-border border-solid border-2 border-[#000000] rounded-[0.75em] bg-white px-4 pt-2 text-black -translate-y-1 -translate-x-1 hover:-translate-y-[0.35rem] hover:-translate-x-[0.35rem] transition-transform ease-in duration-[0.1s]">
            <div className="flex flex-col justify-start items-start font-semibold text-base max-sm:text-xs">
              <span>No.1</span>
              <div className="border-2 border-solid border-black w-full px-3 py-2 mt-4 rounded-[0.75em]">
                <div className="flex justify-between items-center">
                  <div className="flex flex-col justify-start items-start gap-1">
                    <span>Judul</span>
                    <p className="font-mono font-light">Ini Judul</p>
                  </div>
                  <div className="flex flex-col justify-start items-center gap-1">
                    <span>Kode</span>
                    <p className="font-mono font-light">Ini Kode</p>
                  </div>
                  <div className="flex flex-col justify-start items-end gap-1">
                    <span>Kandidat</span>
                    <p className="font-mono font-light">Ini Kandidat</p>
                  </div>
                </div>
                <div className="flex justify-between items-center mt-8">
                  <div className="flex flex-col items-start max-md:items-center justify-start gap-1">
                    <span>Mulai</span>
                    <p className="font-mono font-light">20 Oct 2022 11:00 AM</p>
                  </div>
                  <div className="flex flex-col items-end max-md:items-center justify-start gap-1">
                    <span>Selesai</span>
                    <p className="font-mono font-light">22 Oct 2022 11:AM</p>
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
      </div>
    </div>
  );
};

export default Card;
