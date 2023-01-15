import { FaceSmileIcon } from "@heroicons/react/24/solid";

const Footer = () => {
  return (
    <footer className="w-full border-solid border-t-2 border-zinc-300 mt-20 py-1 flex justify-center items-center">
      <div className="flex w-4/5 justify-center items-center gap-1 text-base font-semibold max-md:text-xs">
        <p>Created with</p>
        <FaceSmileIcon className="h-6 w-6 text-pink-400 hover:text-zinc-400" />{" "}
        <p>by</p>
        <p>Muhammad Teguh Irawan</p>
      </div>
    </footer>
  );
};

export default Footer;
