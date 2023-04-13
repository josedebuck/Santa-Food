import React from "react";

const Footer = () => {
  return (
    <footer className="w-full h-16 flex flex-col items-center justify-center bg-gray-200">
      <div className="flex gap-4 mt-2">
        <a href="#">Términos de uso</a>
        <a href="#">Trabaja con nosotros</a>
        <a href="#">Soporte</a>
      </div>

      <p className="text-gray-600 my-2">© Hecho con ❤️ por @nachodebuck</p>

    </footer>
  );
};

export default Footer;
