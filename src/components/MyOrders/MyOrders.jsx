import React, { useEffect, useState } from "react";
import {
  getFirestore,
  collection,
  query,
  where,
  onSnapshot,
} from "firebase/firestore";
import { useStateValue } from "../../context/StateProvider";

const MyOrders = () => {
  const [{ user }] = useStateValue();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const db = getFirestore();
    const ordersCollection = collection(db, "orders");
    const userOrdersQuery = query(
      ordersCollection,
      where("userId", "==", user.uid)
    );

    const unsubscribe = onSnapshot(userOrdersQuery, (snapshot) => {
      const ordersData = snapshot.docs.map((doc) => doc.data());
      setOrders(ordersData);
    });

    return () => {
      unsubscribe();
    };
  }, [user]);

  // Función para calcular el monto total de la compra
  const calculateTotalAmount = (cartItems) => {
    let totalAmount = 0;
    cartItems.forEach((item) => {
      totalAmount += item.price * item.qty;
    });
    return totalAmount;
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-4">Mis Órdenes</h2>
      {orders.length === 0 ? (
        <p>No tienes ninguna orden.</p>
      ) : (
        <ul className="space-y-8">
          {orders.map((order) => (
            <li key={order.id}>
              <div className="bg-white rounded-md shadow-md p-4">
                <p className="text-gray-600">
                  Fecha: {new Date(order.timestamp).toLocaleString()}
                </p>
                <p className="text-gray-600">
                  Nombre de usuario: {order.userName}
                </p>
                <p className="text-gray-600">
                  Total: ${calculateTotalAmount(order.cartItems)}
                </p>
                {/* Mostrar los demás detalles de la orden */}
                <p className="text-gray-600">
                  Dirección: {order.additionalInfo.address}
                </p>
                <p className="text-gray-600">
                  Número de Teléfono: {order.additionalInfo.phoneNumber}
                </p>
                <p className="text-gray-600">
                  Código Postal: {order.additionalInfo.postalCode}
                </p>
                <p className="text-gray-600">
                  Correo Electrónico: {order.additionalInfo.email}
                </p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MyOrders;
