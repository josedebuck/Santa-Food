import React, { useState, useEffect } from "react";
import { useStateValue } from "../../context/StateProvider";
import { actionType } from "../../context/reducer";
import { useNavigate } from "react-router-dom";
import { BsFillCreditCard2BackFill } from "react-icons/bs";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getFirestore, collection, addDoc } from "firebase/firestore";

const SummaryPage = () => {
  const [{ cartItems, user }, dispatch] = useStateValue();
  const navigate = useNavigate();
  const [creditCardInfo, setCreditCardInfo] = useState({
    cardNumber: "",
    cardholderName: "",
    expirationDate: "",
    cvv: "",
  });
  const [additionalInfo, setAdditionalInfo] = useState({
    address: "",
    email: "",
    postalCode: "",
    phoneNumber: "",
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

  const handlePay = async (event) => {
    event.preventDefault(); // Prevenir recarga de la página

      // Verificar si los campos requeridos están completos
  const requiredFields = [
    "cardNumber",
    "cardholderName",
    "expirationDate",
    "cvv",
    "address",
    "email",
    "postalCode",
    "phoneNumber",
  ];

  const incompleteFields = requiredFields.filter(
    (field) => !creditCardInfo[field] && !additionalInfo[field]
  );

  // Si hay campos incompletos, mostrar alerta y resaltar los campos en rojo
  if (incompleteFields.length > 0) {
    toast.error("Por favor, completa todos los campos");
    const fieldsToHighlight = incompleteFields.map(
      (field) => document.getElementById(field)
    );
    fieldsToHighlight.forEach((field) => {
      field.style.borderColor = "red";
    });
    return;
  }

    // Guardar el estado actual del carrito en el almacenamiento local
    localStorage.setItem("cartItems", JSON.stringify(cartItems));

    // Mostrar notificación de pago realizado
    toast.success("Pago realizado correctamente");

    // Almacenar el pedido en Firebase
    const orderData = {
      cartItems,
      creditCardInfo,
      additionalInfo,
      timestamp: new Date().getTime(),
      userId: user.uid,
      userName: user.displayName,
    };

    const db = getFirestore();

    try {
      const docRef = await addDoc(collection(db, "orders"), orderData);
      console.log("Pedido almacenado con ID:", docRef.id);
    } catch (error) {
      console.error("Error al almacenar el pedido:", error);
    }

    // Redirigir a la página de confirmación después de 5 segundos
    setTimeout(() => {
      navigate("/payment-confirmation");
    }, 5000);
  };

  const calculateGrandTotal = () => {
    return cartItems.reduce((total, item) => total + item.qty * item.price, 0);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    let formattedValue = value;
    if (name === "expirationDate") {
      formattedValue = formatExpirationDate(value); // Formatear la fecha de expiración
      if (formattedValue.length > 5) {
        formattedValue = formattedValue.slice(0, 5); // Limitar a 5 caracteres
      }
    }
    setCreditCardInfo((prevState) => ({
      ...prevState,
      [name]: formattedValue,
    }));
  };

  const handleAdditionalInfoChange = (event) => {
    const { name, value } = event.target;
    setAdditionalInfo((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const formatCreditCardNumber = (number) => {
    // Agregar espacios cada cuatro dígitos
    const formattedNumber = number
      .replace(/\s/g, "")
      .replace(/(\d{4})/g, "$1 ");
    return formattedNumber.trim();
  };

  const formatExpirationDate = (date) => {
    const formattedDate = date.replace(/\D/g, "").slice(0, 5); // Eliminar caracteres no numéricos y limitar a 5 caracteres
    if (formattedDate.length > 2) {
      const month = formattedDate.slice(0, 2);
      const year = formattedDate.slice(2);
      return `${month}/${year}`;
    } else {
      return formattedDate;
    }
  };
  return (
    <div className="p-8">
      <ToastContainer />
      <div className="flex flex-col lg:flex-row">
        <div className="lg:w-1/2 pr-0 lg:pr-8 mb-8 lg:mb-0">
          <div className="flex items-center mb-4">
            <BsFillCreditCard2BackFill className="text-4xl mr-2" />
            <h3 className="text-lg font-bold">Información de Pago</h3>
          </div>
          <form>
            <input
              type="text"
              name="cardNumber"
              placeholder="Número de Tarjeta"
              value={formatCreditCardNumber(creditCardInfo.cardNumber)}
              onChange={handleInputChange}
              className="border border-gray-300 rounded-md py-2 px-3 mb-2 w-full focus:outline-none focus:ring-2 focus:ring-orange-500"
              required
              pattern="[0-9]{4} [0-9]{4} [0-9]{4} [0-9]{4}"
              minLength="19"
              maxLength="19"
            />
            <input
              type="text"
              name="cardholderName"
              placeholder="Nombre del Titular"
              value={creditCardInfo.cardholderName}
              onChange={handleInputChange}
              className="border border-gray-300 rounded-md py-2 px-3 mb-2 w-full focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            <div className="flex flex-col lg:flex-row">
              <input
                type="text"
                name="expirationDate"
                placeholder="Fecha de Expiración"
                value={creditCardInfo.expirationDate}
                onChange={handleInputChange}
                className="border border-gray-300 rounded-md py-2 px-3 mb-2 w-full lg:w-1/2 lg:mr-2 focus:outline-none focus:ring-2 focus:ring-orange-500"        
              />
              <input
                type="text"
                name="cvv"
                placeholder="CVV"
                value={creditCardInfo.cvv}
                onChange={handleInputChange}
                className="border border-gray-300 rounded-md py-2 px-3 mb-2 w-full lg:w-1/2 lg:ml-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                minLength="3"
                maxLength="3"        
              />
            </div>
            <input
              type="text"
              name="address"
              placeholder="Dirección"
              value={additionalInfo.address}
              onChange={handleAdditionalInfoChange}
              className="border border-gray-300 rounded-md py-2 px-3 mb-2 w-full focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            <input
              type="email"
              name="email"
              placeholder="Correo Electrónico"
              value={additionalInfo.email}
              onChange={handleAdditionalInfoChange}
              className="border border-gray-300 rounded-md py-2 px-3 mb-2 w-full focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            <input
              type="text"
              name="postalCode"
              placeholder="Código Postal"
              value={additionalInfo.postalCode}
              onChange={handleAdditionalInfoChange}
              className="border border-gray-300 rounded-md py-2 px-3 mb-2 w-full focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            <input
              type="tel"
              name="phoneNumber"
              placeholder="Número de Teléfono"
              value={additionalInfo.phoneNumber}
              onChange={handleAdditionalInfoChange}
              className="border border-gray-300 rounded-md py-2 px-3 mb-2 w-full focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            <button
              onClick={handlePay}
              className="bg-gradient-to-br from-orange-400 to-orange-500 py-2 px-4 rounded-md w-full hover:bg-orange-600"
            >
              {cartItems.length === 1 ? "Pagar" : "Pagar Todo"}
            </button>
          </form>
        </div>
        <div className="lg:w-1/2">
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
  );
};

export default SummaryPage;