"use client";
// import Image from "next/image";
import { useState } from "react";
// import { useRouter } from "next/router";
import Link from "next/link";

//icons
import { HiArrowSmRight } from "react-icons/hi";

export default function Home() {
  // const router = useRouter();
  const [nome, setNome] = useState("");

  // function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
  //   e.preventDefault();
  //   router.push(`/envio`);
  // }

  return (
    <main
      className="h-screen flex items-center justify-center bg-gradient-to-br 
     from-purple-900 via-black to-black"
    >
      <div className="px-4">
        <section
          className=" 
           flex items-center relative "
        >
          {/* <div className="absolute z-50 -rotate-20 mr-0">
            <Image src="/florpng.png" alt="Logo" width={40} height={40} />
          </div> */}
          <div className="spinner">
            <div className="universe"></div>
          </div>
          <div>
            <p className=" font-bold text-lg ml-4 animate-pulse text-orange-500">
              CORA
            </p>
            <p
              className=" font-bold text-lg ml-4 animate-pulse
            -mt-2 text-purple-700"
            >
              IA
            </p>
          </div>
        </section>
        <h1 className="text-white text-4xl mt-8 font-bold drop-shadow-lg">
          <strong>AutoQuest</strong>
          <p>Criação automática de questões.</p>
        </h1>
        <form className="mt-4 flex ">
          <input
            required
            className="border-b border-gray-200 outline-none"
            type="text"
            placeholder="Digite seu nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />
          <Link href={"/envio"}>
            <button
              type="submit"
              className="bg-gradient-to-br
           from-purple-900 via-purple-600 to-white
           rounded-full cursor-pointer ml-4 
           shadow  hover:scale-105 transition duration-300
           animate-gradient"
            >
              <HiArrowSmRight size={38} color="white" />
            </button>
          </Link>
        </form>
      </div>
    </main>
  );
}
