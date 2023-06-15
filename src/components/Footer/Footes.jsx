import React from 'react';
import './Footer.css';
import { useNavigate } from 'react-router-dom';

function Footes() {
  const navigate = useNavigate();

  const redirectToHome = () => {
    navigate('/');
  };

  return (
    <div className="footer">
      <button className="footer-button" onClick={redirectToHome}>Inicio</button>
      <button className="footer-button">Sobre nosotros</button>
      <button className="footer-button">Menú</button>
      <button className="footer-button">Servicios</button>
    </div>
  );
}

export default Footes;
