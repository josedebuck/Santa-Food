import React, { useEffect } from "react";
import { BsFillCreditCard2BackFill } from "react-icons/bs";
import { useStateValue } from "../../context/StateProvider";
import { actionType } from "../../context/reducer";

const PaymentConfirmationPage = () => {
  const [{ cartItems }, dispatch] = useStateValue();

  // Función para calcular el monto total
  const calculateGrandTotal = () => {
    let total = 0;
    cartItems.forEach((item) => {
      total += item.qty * item.price;
    });
    return total;
  };

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      // Vaciar el carrito y limpiar el almacenamiento local
      dispatch({
        type: actionType.SET_CART_ITEMS,
        cartItems: [],
      });
      localStorage.removeItem("cartItems");
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Pago realizado correctamente</h1>
      <div className="flex items-center mt-4">
        <BsFillCreditCard2BackFill className="text-4xl mr-4" />
        <div className="credit-card-form">
          <div className="flex items-center mb-4">
            <h3 className="text-lg font-bold">Información de Pago</h3>
          </div>
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
        </div>
      </div>
    </div>
  );
};

export default PaymentConfirmationPage;
