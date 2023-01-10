import { CheckIcon } from "@heroicons/react/24/solid";

const CandidateItem = () => {
  return (
    <div className="p-6 w-3/4 bg-white rounded-xl shadow-lg flex items-center gap-4">
      <div className="w-10 bg-zinc-300 aspect-square font-bold flex justify-center items-center">
        <h1 className="text-lg">1</h1>
      </div>
      <div className="w-full">
        <h2 className="text-xl font-bold text-black">Budi</h2>
        <p className="text-sm font-normal">Kandidat 1</p>
        <div className="flex items-center space-x-2">
          <div className="w-full h-1 bg-zinc-100 rounded-md">
            <div
              className="h-1 bg-black rounded-full"
              style={{ width: "45%" }}
            />
          </div>
          <div className="text-sm font-semibold">45%</div>
        </div>
      </div>
      <div className="bg-zinc-300 text-zinc-700 hover:text-green-400 w-16 aspect-square flex justify-center items-center cursor-pointer rounded-md">
        <CheckIcon className="h-7 w-7 transition-color duration-300 delay-0 ease-cubic-bezier" />
      </div>
    </div>
  );
};

export default CandidateItem;
