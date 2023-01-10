import Head from "next/head";
import Image from "next/image";
import Google from "../../public/assets/google.svg";
import Logo from "../../public/assets/Onevote.svg";
import { useRouter } from "next/router";
import { useSession, signIn, getProviders } from "next-auth/react";

const Login = ({ providers }) => {
  const { data: session } = useSession();
  const router = useRouter();

  if (session) {
    router.push("/");
  }

  return (
    <>
      <Head>
        <title>Login Page</title>
      </Head>
      <div className="container mx-auto h-screen w-full px-14 flex flex-col justify-center items-center gap-6">
        <Image
          alt="Logo"
          src={Logo}
          className="w-40 max-md:w-32 cursor-pointer"
          onClick={() => router.push("/")}
        />
        {Object.values(providers).map((provider, i) => (
          <button
            className="flex justify-center items-center px-8 py-2 gap-2 bg-white border-solid border-2 border-zinc-700 rounded-none hover:bg-zinc-700 hover:text-white transition-all duration-300 delay-0 ease-cubic-bezier"
            key={i}
            onClick={() => signIn(provider.id)}
          >
            <Image alt="Google" src={Google} className="w-5 aspect-square" />
            <span className="text-sm font-medium">
              Login dengan {provider.name}
            </span>
          </button>
        ))}
      </div>
    </>
  );
};
export default Login;

export async function getServerSideProps() {
  const providers = await getProviders();
  return {
    props: { providers },
  };
}
