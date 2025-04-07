"use client";
import {
  GoogleGenAI,
  createUserContent,
  createPartFromUri,
} from "@google/genai";
dotenv.config();

import * as path from "path";

const media = "./media";

const ai = new GoogleGenAI({
  apiKey: "AIzaSyD2DGLj6TrFyuU7rsigVe4UCIGmcKkzw-g",
});

import dotenv from "dotenv";
import Image from "next/image";
import { useState } from "react";

export default function Enviar() {
  const [banca, setBanca] = useState("");
  const [pdf, setPdf] = useState<any>();
  const [nivel, setNivel] = useState("");
  const [questoes, setQuestoes] = useState("");

  const [arquivoGerado, setArquivo] = useState<string>();

  const prompt = `utilize este arquivo em ${pdf} para criar
   10 questões sobre o conteúdo contido dentro do arquivo. Me retorne questões sobre o assunto. 
   Cada questão deve ter 5 alternativas (a, b, c, d, e). 
   Quero que seja questões elaboradas de nível ${nivel}. 
   Além disso tem um limite de questões, quero apenas ${questoes} questões.
   Lembre-se, as questões devem ser 
   elaboradas de acordo com o estilo de questões 
   anteriores da banca avaliadora ${banca}.`;

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const myfile = await ai.files.upload({
      file: pdf,
      config: { mimeType: "application/pdf" },
    });

    const part = createPartFromUri(myfile.uri ?? "", "application/pdf");
    const userContent = createUserContent(prompt);

    async function main() {
      const response = await ai.models.generateContent({
        model: "gemini-2.0-flash",
        contents: [part, userContent],
      });

      setArquivo(response.text);
    }

    main();
  }

  console.log(arquivoGerado);
  return (
    <main
      className="h-screen  
       bg-gradient-to-br flex flex-col 
       from-purple-900 via-black to-black"
    >
      <section className="flex items-center ml-4 pt-4 relative ">
        <div className="absolute z-50 -rotate-20 mr-0">
          <Image src="/florpng.png" alt="Logo" width={35} height={35} />
        </div>
        <div className="spinner ml-11">
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
        <div className="">
          <h1
            className="text-white ml-8
          text-xs mr-8 font-bold drop-shadow-lg"
          >
            <strong>AutoQuest</strong>
            <p>Criação automática de questões.</p>
          </h1>
        </div>
      </section>
      {/*form */}
      <section
        className="flex flex-col items-center
       justify-center m-auto w-screen "
      >
        <form
          onSubmit={handleSubmit}
          className="w-1/2 px-16 max-md:px-8 max-md:w-screen"
        >
          <p className="text-xs mt-4">Selecione um arquivo em pdf</p>
          <input
            onChange={(e) => {
              if (e.target.files) {
                setPdf(e.target.files[0]);
              }
            }}
            type="file"
            accept=".pdf"
            className="block w-full text-sm text-gray-300
      file:mr-4 file:py-2 file:px-4
      file:rounded-lg file:border-0
      file:bg-[#1a1a1a] file:text-white 
     file:cursor-pointer
      cursor-pointer rouded-lg mt-2 "
          />

          <p className="text-xs mt-8">Selecione a difuldade</p>
          <select
            value={nivel}
            onChange={(e) => setNivel(e.target.value)}
            className="input w-full text-xs mt-2"
            name=""
            id=""
          >
            <option className="text-xs font-light uppercase" value="normal">
              Normal
            </option>
            <option className="text-xs font-light uppercase" value="Dificil">
              Difícil
            </option>
            <option className="text-xs font-light uppercase" value="Expert">
              Expert
            </option>
          </select>

          <p className="text-xs mt-8">Qnt. de questões</p>
          <select
            value={questoes}
            onChange={(e) => setQuestoes(e.target.value)}
            className="input w-full text-xs mt-2"
            name=""
            id=""
          >
            <option className="text-xs font-light" value="10">
              10
            </option>
            <option className="text-xs font-light" value="20">
              20
            </option>
            <option className="text-xs font-light" value="30">
              30
            </option>
          </select>

          <p className="text-xs mt-8">Selecione uma banca</p>
          <select
            value={banca}
            onChange={(e) => setBanca(e.target.value)}
            className="input w-full text-xs mt-2"
            name=""
            id=""
          >
            <option className="text-xs font-light" value="ADM&TEC">
              ADM&TEC
            </option>
            <option className="text-xs font-light" value="IGEDUC">
              IGEDUC
            </option>
            <option className="text-xs font-light" value="CONSULPAM">
              CONSULPAM
            </option>
            <option className="text-xs font-light" value="FAFIPA">
              FAFIPA
            </option>
            <option className="text-xs font-light" value="COPEVE-UFAL">
              COPEVE-UFAL
            </option>
            <option className="text-xs font-light" value="FUNCERN">
              FUNCERN
            </option>
            <option className="text-xs font-light" value="NUCEPE">
              NUCEPE
            </option>
            <option className="text-xs font-light" value="COPESE-UFPI">
              COPESE-UFPI
            </option>
            <option className="text-xs font-light" value="IBAM">
              IBAM
            </option>
            <option className="text-xs font-light" value="Legatus">
              Legatus
            </option>
            <option className="text-xs font-light" value="ADVISE">
              ADVISE
            </option>
            <option className="text-xs font-light" value="FACET Concursos">
              FACET Concursos
            </option>
            <option className="text-xs font-light" value="IDIB">
              IDIB
            </option>
            <option className="text-xs font-light" value="AOCP">
              AOCP
            </option>
            <option className="text-xs font-light" value="IDECAN">
              IDECAN
            </option>
            <option className="text-xs font-light" value="CESPE/Cebraspe">
              CESPE/Cebraspe
            </option>
            <option className="text-xs font-light" value="FGV">
              FGV
            </option>
            <option className="text-xs font-light" value="FCC">
              FCC
            </option>
            <option className="text-xs font-light" value="IBFC">
              IBFC
            </option>
            <option className="text-xs font-light" value="Quadrix">
              Quadrix
            </option>
            <option className="text-xs font-light" value="Consulplan">
              Consulplan
            </option>
            <option className="text-xs font-light" value="Vunesp">
              Vunesp
            </option>
            <option className="text-xs font-light" value="Cesgranrio">
              Cesgranrio
            </option>
            <option className="text-xs font-light" value="FUNDATEC">
              FUNDATEC
            </option>
            <option className="text-xs font-light" value="Objetiva Concursos">
              Objetiva Concursos
            </option>
            <option className="text-xs font-light" value="Legalle Concursos">
              Legalle Concursos
            </option>
            <option className="text-xs font-light" value="UEPB">
              UEPB
            </option>
            <option className="text-xs font-light" value="UFC">
              UFC
            </option>
            <option className="text-xs font-light" value="IFS">
              IFS
            </option>
          </select>
          <div className="flex items-center justify-center m-auto mt-4">
            <button
              type="submit"
              className="bg-gradient-to-tl to-orange-600
             via-purple-400 from-purple-800 p-2
              cursor-pointer font-bold text-white
               rounded-2xl px-8  animateShadow"
            >
              Enviar
            </button>
          </div>
        </form>
      </section>
      {/*end form */}
    </main>
  );
}
