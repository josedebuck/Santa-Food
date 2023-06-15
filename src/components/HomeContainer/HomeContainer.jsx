import React from "react";


const HomeContainer = () => {
  return (
    <section
      className="grid grid-cols-1 md:grid-cols-2 gap-2 w-full "
      id="home"
    >
      <div className="py-2 flex-1 flex flex-col items-start justify-center gap-6">


        <p className="text-[2.5rem] lg:text-[4rem] font-bold tracking-wide text-headingColor">
          El mejor delivery en <br></br>
          <span className="text-orange-600 text-[3rem] lg:text-[5rem]">
            Santa Food
          </span>
        </p>

        <p className="text-base text-textColor text-center md:text-left md:w-[80%]">
        Somos una empresa local de entregas a domicilio. Trabajamos con una fórmula donde nuestros repartidores se sienten como una extensión de tu negocio.
        “Si tu empresa vende más, nosotros repartiremos más”. Intentamos que los pequeños comercios 
        lleguen más lejos e incrementen sus ventas con este servicio. 
        </p>

        <button
          type="button"
          className="bg-gradient-to-br from-orange-400 to-orange-500 w-full md:w-auto px-4 py-2  rounded-lg hover:shadow-lg transition-all ease-in-out duration-100"
        >
          Pedir!
        </button>
      </div>
      <div className="py-2 flex-1 flex items-center relative">
      </div>
    </section>
  );
};

export default HomeContainer;