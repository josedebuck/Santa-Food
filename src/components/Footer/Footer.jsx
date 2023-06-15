import React from "react";

const Footer = () => {
  return (

<footer class="bg-white rounded-lg shadow m-4 dark:bg-gray-800">
    <div class="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
      <span class="text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2023 <a href="https://flowbite.com/" class="hover:underline">Santa Food</a>.Todos los derechos reservados.
    </span>
    <ul class="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
        <li>
            <a href="#" class="mr-4 hover:underline md:mr-6 ">Sobre Nosotros</a>
        </li>
        <li>
            <a href="#" class="mr-4 hover:underline md:mr-6">Política de Privacidad</a>
        </li>
        <li>
            <a href="#" class="mr-4 hover:underline md:mr-6">Trabajá con nosotros</a>
        </li>
        <li>
            <a href="#" class="hover:underline">Contactanos</a>
        </li>
    </ul>
    </div>
</footer>

  );
};

export default Footer;
