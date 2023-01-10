import Image from "next/image";
import HeaderImg from "../public/assets/header.svg";
import Button from "./Button";
import { useRouter } from "next/router";

const Header = () => {
  const router = useRouter();

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="flex flex-col justify-center items-center gap-4">
        <h1 className="text-5xl font-bold max-[450px]:text-2xl">
          Ayo Mulai Voting
        </h1>
        <h2 className="text-1xl font-normal bg-zinc-100 px-10 py-1">
          Web Voting No.1 Di Indonesia
        </h2>
      </div>
      <div className="py-14 flex justify-center items-center">
        <Image src={HeaderImg} alt="Header" width={274} height={243} />
      </div>
      <div className="flex justify-center space-x-10 items-center">
        <Button
          text="Buat Vote Baru"
          className="font-semibold"
          onClick={() => router.push("/vote/create")}
        />
        <Button
          text="Ikutan Vote"
          type="secondary"
          className="font-semibold"
          onClick={() => router.push("/participant")}
        />
      </div>
    </div>
  );
};

export default Header;
