export default function Enviar() {
  return (
    <main
      className="h-screen  
       bg-gradient-to-br flex flex-col 
       from-purple-900 via-black to-black"
    >
      <section className="flex items-center ml-4 pt-4 ">
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
        <form className="w-1/2 px-16 max-md:px-8 max-md:w-screen">
          <input
            type="file"
            accept=".pdf"
            className="block w-full text-sm text-gray-300
      file:mr-4 file:py-2 file:px-4
      file:rounded-lg file:border-0
      bg-[#1a1a1a]
      file:bg-[#303030] file:text-white animateShadow
      hover:file:bg-black
      cursor-pointer rouded-lg p-2"
          />

          <p className="text-xs mt-4">Selecione uma banca</p>
          <select className="input w-full text-xs mt-2" name="" id="">
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
        </form>
      </section>
      {/*end form */}
    </main>
  );
}
