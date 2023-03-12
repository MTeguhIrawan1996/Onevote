import Image from "next/image";
import Button from "./Button";
import Logo from "../public/assets/Onevote.svg";
import { useEffect, useRef } from "react";
import { useRouter } from "next/router";
import { useSession, signIn, signOut } from "next-auth/react";

const Navbar = () => {
  const { data: session } = useSession();

  const navbarRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      // Mendapatkan nilai scroll position
      const scrollPos = window.scrollY;

      // Menentukan apakah navbar perlu di-fix atau tidak
      if (scrollPos > 50) {
        navbarRef.current?.classList.add("shadow-md");
      } else {
        navbarRef.current?.classList.remove("shadow-md");
      }
    };
    // Menambahkan event listener pada event scroll
    window.addEventListener("scroll", handleScroll);

    // Menghapus event listener saat component di-unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      ref={navbarRef}
      className="flex justify-between py-5 items-center max-[900px]:px-10 px-20 transition ease-in-out fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-white/75"
    >
      <Image
        src={Logo}
        width={100}
        height={100}
        alt="Onedev"
        onClick={() => router.push("/")}
        className="cursor-pointer"
      />
      {session ? (
        <div className="flex justify-center items-center gap-6">
          <span className="text-lg font-semibold max-md:hidden">
            {session?.user?.name}
          </span>
          <Button text="Logout" onClick={signOut} />
        </div>
      ) : (
        <Button text="Login" onClick={signIn} />
      )}
    </div>
  );
};

export default Navbar;
