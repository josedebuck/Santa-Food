import React, { useState, useEffect } from "react";
import { useStateValue } from "../../context/StateProvider";
import { actionType } from "../../context/reducer";
import { useNavigate } from "react-router-dom";
import { BsFillCreditCard2BackFill } from "react-icons/bs";
import { MdPayment } from "react-icons/md";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SummaryPage = () => {
  const [{ cartItems }, dispatch] = useStateValue();
  const navigate = useNavigate();
  const [creditCardInfo, setCreditCardInfo] = useState({
    cardNumber: "",
    cardholderName: "",
    expirationDate: "",
    cvv: "",
  });

  useEffect(() => {
    if (cartItems.length === 0) {
      // Intentar obtener elementos del carrito desde el almacenamiento local
      const storedCartItems = localStorage.getItem("cartItems");
      if (storedCartItems) {
        dispatch({
          type: actionType.SET_CART_ITEMS,
          cartItems: JSON.parse(storedCartItems),
        });
      }
    }
  }, []); // Ejecutar solo una vez al cargar la página

  const handlePay = (event) => {
    event.preventDefault(); // Prevenir recarga de la página

    // Guardar el estado actual del carrito en el almacenamiento local
    localStorage.setItem("cartItems", JSON.stringify(cartItems));

    // Mostrar notificación de pago realizado
    toast.success("Pago realizado correctamente");

    // Redirigir a la página de confirmación después de 5 segundos
    setTimeout(() => {
      navigate("/payment-confirmation");
    }, 5000);
  };

  // Función para calcular la suma total de la cantidad de cada artículo
  const calculateTotalQuantity = () => {
    return cartItems.reduce((total, item) => total + item.qty, 0);
  };

  // Función para calcular el total general de todos los artículos
  const calculateGrandTotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.qty * item.price,
      0
    );
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCreditCardInfo((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div className="p-8">
      <ToastContainer />      
      <div className="flex">
        <div className="w-1/2 pr-8">
          <div className="flex items-center mb-4">
            <BsFillCreditCard2BackFill className="text-4xl mr-2" />
            <h3 className="text-lg font-bold">Información de Pago</h3>
          </div>
          <form>
            <input
              type="text"
              name="cardNumber"
              placeholder="Número de Tarjeta"
              value={creditCardInfo.cardNumber}
              onChange={handleInputChange}
              className="border border-gray-300 rounded-md py-2 px-3 mb-2 w-full focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            <input
              type="text"
              name="cardholderName"
              placeholder="Nombre del Titular"
              value={creditCardInfo.cardholderName}
              onChange={handleInputChange}
              className="border border-gray-300 rounded-md py-2 px-3 mb-2 w-full focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            <div className="flex justify-between">
              <input
                type="text"
                name="expirationDate"
                placeholder="Fecha de Expiración"
                value={creditCardInfo.expirationDate}
                onChange={handleInputChange}
                className="border border-gray-300 rounded-md py-2 px-3 mb-2 w-1/2 focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
              <input
                type="text"
                name="cvv"
                placeholder="CVV"
                value={creditCardInfo.cvv}
                onChange={handleInputChange}
                className="border border-gray-300 rounded-md py-2 px-3 mb-2 w-1/2 focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
            <button
              onClick={handlePay}
              className="bg-gradient-to-br from-orange-400 to-orange-500 py-2 px-4 rounded-md w-full hover:bg-orange-600"
            >
              {cartItems.length === 1 ? "Pagar" : "Pagar Todo"}
            </button>
          </form>
        </div>
        <div className="w-1/2">
          <div className="flex items-center">
            <div className="text-4xl mr-4" />
            <div className="credit-card-form">
              <div className="flex items-center mb-4">
                <h3 className="text-lg font-bold">Resumen de Compra</h3>
              </div>
              {cartItems.length > 0 ? (
                <div className="bg-white border border-gray-300 rounded-md py-2 px-3 mb-2">
                  <h4 className="text-lg font-bold mb-2">Resumen de Compra:</h4>
                  <ul className="list-disc pl-4">
                    {cartItems.map((item) => (
                      <li key={item.id}>
                        {item.title} - ${item.price} x {item.qty} - Total: $
                        {item.qty * item.price}
                      </li>
                    ))}
                  </ul>
                  <hr className="my-4" />
                  <p className="text-lg font-bold">
                    Monto Total: ${calculateGrandTotal()}
                  </p>
                </div>
              ) : (
                <p>No hay elementos en el carrito</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SummaryPage;