"use client";
import {
  GoogleGenAI,
  createUserContent,
  createPartFromUri,
} from "@google/genai";
dotenv.config();
import jsPDF from "jspdf";

const ai = new GoogleGenAI({
  apiKey: "AIzaSyD2DGLj6TrFyuU7rsigVe4UCIGmcKkzw-g",
});

import dotenv from "dotenv";
// import Image from "next/image";
import { useState } from "react";

export default function Enviar() {
  const [banca, setBanca] = useState("");
  const [pdf, setPdf] = useState<any | string>();
  const [nivel, setNivel] = useState("");
  const [questoes, setQuestoes] = useState("");
  const [loading, setLoading] = useState(false);
  const [resultado, setResultado] = useState<boolean>(false);
  const [arquivoTexto, setArquivo] = useState<string | any>();
  const [titulo, setTitulo] = useState<string>("");
  const [mostrarPdf, setMostrarPdf] = useState(false);

  const prompt = `utilize o conteúdo deste arquivo em pdf ${pdf} para criar
    questões sobre o conteúdo contido dentro do arquivo. Me retorne questões sobre o assunto. 
   Cada questão deve ter 5 alternativas (a, b, c, d, e). 
   Quero que seja questões elaboradas de nível ${nivel}. 
   Além disso tem um limite de questões, quero apenas ${questoes} questões.
   Lembre-se, as questões devem ser 
   elaboradas de acordo com o estilo de questões 
   anteriores da banca avaliadora ${banca}. A ideia principal é utilizar você para me ajudar
   a estudar para concursos, lembre-se de fazer algumas questões com pegadinhas e armadilhas que me façam confundir as respostas, por favor
   seja extremamente criativo.`;

  const ptomptText = `utilize este titulo: ${titulo} para criar
   questões sobre o assunto didático referente ao assunto ${titulo}. Me retorne questões sobre o assunto. 
  Cada questão deve ter 5 alternativas (a, b, c, d, e). 
  Quero que seja questões elaboradas de nível ${nivel}. 
  Além disso tem um limite de questões, quero apenas ${questoes} questões.
  Lembre-se, as questões devem ser 
  elaboradas de acordo com o estilo de questões 
  anteriores da banca avaliadora ${banca}. A ideia principal é utilizar você para me ajudar
   a estudar para concursos, lembre-se de fazer algumas questões com pegadinhas e armadilhas que me façam confundir as respostas, por favor
   seja extremamente criativo. `;

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
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

      const arquivosData: string | any = response.text;
      setArquivo(arquivosData);
      setLoading(false);
      setResultado(true);
      console.log(arquivoTexto);

      // const pdf = new jsPDF();
      // pdf.setFontSize(9);

      // const linhas = pdf.splitTextToSize(arquivoTexto, 170);
      // let y = 10;
      // for (const linha of linhas) {
      //   if (y > 250) {
      //     pdf.addPage();
      //     y = 10;
      //   }
      //   pdf.text(linha, 15, y);
      //   y += 5;
      // }

      // const filename = "questões.pdf";
      // pdf.save(filename);
    }

    main();
  }

  async function mainText(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: ptomptText,
    });

    const arquivosData: string | any = response.text;
    setArquivo(arquivosData);
    setLoading(false);
    setResultado(true);
  }

  function getPdf() {
    if (!arquivoTexto) {
      console.error("O texto do arquivo não está definido.");
      return;
    }

    const pdf = new jsPDF();
    pdf.setFontSize(9);

    // Adicionar o texto ao PDF em várias páginas
    const linhas = pdf.splitTextToSize(arquivoTexto, 170); // largura máxima em pontos
    let y = 10;
    for (const linha of linhas) {
      if (y > 250) {
        pdf.addPage();
        y = 10;
      }
      pdf.text(linha, 15, y);
      y += 5;
    }
    const filename = "questões.pdf";
    pdf.save(filename);
  }

  return (
    <main
      className="h-screen  relative
       bg-gradient-to-br flex flex-col 
       from-purple-900 via-black to-black"
    >
      {loading && (
        <section
          id="loading"
          className="absolute z-100
      h-screen  w-screen 
       bg-gradient-to-br flex flex-col items-center justify-center m-auto
       from-purple-900 via-black to-black "
        >
          <div className="loader"></div>
          <div className="loader2"></div>
          <p className="text-xs text-white font-extralight text-center mt-4 ">
            Aguarde... <br />
            CORA IA está analisando
            <br />
            os dados.
          </p>
        </section>
      )}
      {/*Resultado do texto*/}
      {resultado && (
        <section
          id="loading"
          className="absolute z-100
     h-screen  w-screen 
      bg-gradient-to-br flex flex-col items-center 
      justify-center m-auto
      from-purple-900 via-black to-black "
        >
          <section className="flex-col items-center pt-4 relative ">
            {/* <div className="absolute z-50 -rotate-20 ">
          <Image src="/florpng.png" alt="Logo" width={35} height={35} />
        </div> */}
            <div className="flex items-center justify-center m-auto mb-4">
              <div className="spinner ">
                <div className="universe"></div>
              </div>
              <div>
                <p className=" font-bold text-lg ml-4 animate-pulse text-orange-500">
                  CLICK
                </p>
                <p
                  className=" font-bold text-lg ml-4 animate-pulse
            -mt-2 text-purple-700"
                >
                  EM DOWNLOAD
                </p>
              </div>
            </div>
            <div className="">
              <h1
                className="text-white ml-8 text-center mb-4
          text-xs mr-8 font-bold drop-shadow-lg"
              >
                <strong>AutoQuest</strong>
                <p>Criação automática de questões.</p>
              </h1>
            </div>
          </section>
          <button
            onClick={getPdf}
            id="donwload"
            className="bg-gradient-to-tl to-orange-600
             via-purple-400 from-purple-800 p-2
              cursor-pointer font-bold text-white
               bg-animate
              rounded-2xl px-8 hover:scale-105 duration-300 transform "
          >
            Download
          </button>
        </section>
      )}
      <section className="flex items-center ml-4 pt-4 relative ">
        {/* <div className="absolute z-50 -rotate-20 ">
          <Image src="/florpng.png" alt="Logo" width={35} height={35} />
        </div> */}
        <div className="spinner ">
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
          onSubmit={mostrarPdf ? handleSubmit : mainText}
          className="w-1/2 px-16 max-md:px-8 max-md:w-screen"
        >
          {/*ANEXO PDF*/}
          <div className="border p-4 rounded-lg border-[#1a1a1a]">
            <div>
              <div>
                <p className="text-xs mb-4">Selecione o tipo de arquivo:</p>
                <label className="flex items-center">
                  <input
                    checked={mostrarPdf === false}
                    onChange={(e) => {
                      setMostrarPdf(false);
                    }}
                    id="texto"
                    type="checkbox"
                    className="input"
                  />
                  <p className="text-xs ml-2 ">Texto</p>
                </label>
              </div>
              <div>
                <label className="flex items-center">
                  <input
                    checked={mostrarPdf === true}
                    onChange={(e) => {
                      setMostrarPdf(true);
                    }}
                    id="pdf"
                    type="checkbox"
                    className="input"
                  />
                  <p className="text-xs ml-2 ">Arquivo em pdf</p>
                </label>
              </div>
            </div>
            {mostrarPdf && (
              <div id="anexarPdf" className="">
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
              </div>
            )}
            {!mostrarPdf && (
              <div id="anexarTitulo" className="">
                <p className="text-xs mt-4">ou digite o título do assunto :</p>
                <input
                  value={titulo}
                  onChange={(e) => setTitulo(e.target.value)}
                  placeholder="Difite o título do assunto"
                  className="input outline-none
         bg-[#1a1a1a] mt-2 p-2 text-xs "
                  type="text"
                />
              </div>
            )}
          </div>
          {/*FIM ANEXO PDF */}
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
            {mostrarPdf ? (
              <button
                type="submit"
                className="bg-gradient-to-tl to-orange-600
             via-purple-400 from-purple-800 p-2
              cursor-pointer font-bold text-white
               bg-animate
              rounded-2xl px-8 hover:scale-105 duration-300 transform "
              >
                Enviar PDF
              </button>
            ) : (
              <button
                type="submit"
                className="bg-gradient-to-tl to-orange-600
             via-purple-400 from-purple-800 p-2
              cursor-pointer font-bold text-white
               bg-animate
              rounded-2xl px-8 hover:scale-105 duration-300 transform "
              >
                Enviar TXT
              </button>
            )}
          </div>
        </form>
      </section>
      {/*end form */}
    </main>
  );
}
