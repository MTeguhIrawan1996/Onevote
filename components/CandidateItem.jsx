import { CheckIcon } from "@heroicons/react/24/solid";

const CandidateItem = (props) => {
  const { data, selected, percentage, onClick } = props;
  return (
    <div className="p-6 w-3/4 bg-white rounded-xl shadow-lg flex items-center gap-4">
      <div className="w-10 bg-zinc-300 aspect-square font-bold flex justify-center items-center">
        <h1 className="text-lg">{data.key}</h1>
      </div>
      <div className="w-full">
        <h2 className="text-xl font-bold text-black">{data.name}</h2>
        <p className="text-sm font-normal">Kandidat {data.key}</p>
        <div className="flex items-center space-x-2">
          <div className="w-full h-1 bg-zinc-100 rounded-md">
            <div
              className="h-1 bg-green-400 rounded-full"
              style={{ width: `${percentage}%` }}
            />
          </div>
          <div className="text-sm font-semibold">
            {Intl.NumberFormat("en", { notation: "compact" }).format(
              percentage
            )}
            %
          </div>
        </div>
      </div>
      <div
        onClick={onClick}
        className={`${
          selected
            ? "bg-green-400 text-zinc-300"
            : "bg-zinc-300 text-zinc-700 hover:text-green-400"
        } w-16 aspect-square flex justify-center items-center cursor-pointer rounded-md`}
      >
        <CheckIcon className="h-7 w-7 transition-color duration-300 delay-0 ease-cubic-bezier" />
      </div>
    </div>
  );
};

export default CandidateItem;
