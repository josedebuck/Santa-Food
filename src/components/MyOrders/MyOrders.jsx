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
    <div>
      <h2>Mis Ordenes</h2>
      {orders.length === 0 ? (
        <p>No tienes ninguna orden.</p>
      ) : (
        <ul>
          {orders.map((order) => (
            <li key={order.id}>
              <p>Fecha: {new Date(order.timestamp).toLocaleString()}</p>
              <p>Nombre de usuario: {order.userName}</p>
              <p>Total: {calculateTotalAmount(order.cartItems)}</p>
              {/* Mostrar los demás detalles de la orden */}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MyOrders;
