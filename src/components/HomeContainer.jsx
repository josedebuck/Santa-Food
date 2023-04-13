import React from "react";
import Delivery from "../img/delivery.png";
import HeroBg from "../img/heroBg.png";
import { heroData } from "../utils/data";

const HomeContainer = () => {
  return (
    <section
      className="grid grid-cols-1 md:grid-cols-2 gap-2 w-full "
      id="home"
    >
      <div className="py-2 flex-1 flex flex-col items-start justify-center gap-6">
        <div className="flex items-center gap-2 justify-center bg-orange-100 px-4 py-1 rounded-full">
          <p className="text-base text-orange-500 font-semibold">
            Nuestro Delivery
          </p>
          <div className="w-8 h-8 bg-white rounded-full overflow-hidden drop-shadow-xl">
            <img
              src={Delivery}
              className="w-full h-full object-contain"
              alt="delivery"
            />
          </div>
        </div>

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
