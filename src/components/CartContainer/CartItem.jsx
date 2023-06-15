import React, { useEffect, useState } from "react";
import { BiMinus, BiPlus } from "react-icons/bi";
import { motion } from "framer-motion";
import { useStateValue } from "../../context/StateProvider";
import { actionType } from "../../context/reducer";
import { fetchCart } from "../../utils/fetchLocalStorageData";
let items = [];

const CartItem = ({ item, setFlag, flag }) => {
  const [{ cartItems }, dispatch] = useStateValue();
  const [qty, setQty] = useState(item.qty);

  const cartDispatch = (updatedCartItems) => {
    localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
    dispatch({
      type: actionType.SET_CARTITEMS,
      cartItems: updatedCartItems,
    });
  };

  const updateQty = (action, id) => {
    if (action === "add") {
      setQty(qty + 1);
      handleUpdateQty("add");
    } else {
      const newQty = qty - 1;
      if (newQty <= 0) {
        setQty(0);
        handleUpdateQty("remove"); // Mover aquí la llamada a handleUpdateQty("remove")
      } else {
        setQty(newQty);
        handleUpdateQty("subtract");
      }
    }
  };

  useEffect(() => {
    if (item.qty !== qty) {
      setQty(item.qty);
    }
  }, [item.qty, qty]);

  const handleUpdateQty = (action) => {
    if (action === "add") {
      const updatedCartItems = cartItems.map((cartItem) => {
        if (cartItem.id === item.id) {
          return {
            ...cartItem,
            qty: cartItem.qty + 1,
          };
        }
        return cartItem;
      });
      cartDispatch(updatedCartItems);
    } else if (action === "remove") {
      const updatedCartItems = cartItems.filter(
        (cartItem) => cartItem.id !== item.id
      );
      cartDispatch(updatedCartItems);
      setQty(0); // Establecer qty en 0 al eliminar el artículo
    } else if (action === "subtract") {
      const updatedCartItems = cartItems
        .map((cartItem) => {
          if (cartItem.id === item.id) {
            const newQty = cartItem.qty - 1;
            if (newQty <= 0) {
              // Eliminar el artículo del carrito si la cantidad es menor o igual a cero
              return null;
            }
            return {
              ...cartItem,
              qty: newQty,
            };
          }
          return cartItem;
        })
        .filter(Boolean); // Filtrar los elementos nulos (artículos eliminados)
      cartDispatch(updatedCartItems);
    }
  };

  return (
    <div className="w-full p-1 px-2 rounded-lg bg-cartItem flex items-center gap-2">
      <img
        src={item?.imageURL}
        className="w-20 h-20 max-w-[60px] rounded-full object-contain"
        alt=""
      />

      <div className="flex flex-col gap-2">
        <p className="text-base text-gray-50">{item?.title}</p>
        <p className="text-sm block text-gray-300 font-semibold">
          $ {parseFloat(item?.price) * item.qty}
        </p>
      </div>

      <div className="group flex items-center gap-2 ml-auto cursor-pointer">
        <motion.div
          whileTap={{ scale: 0.75 }}
          onClick={() => updateQty("remove", item?.id)}
        >
          <BiMinus className="text-gray-50" />
        </motion.div>

        <p className="w-5 h-5 rounded-sm bg-cartBg text-gray-50 flex items-center justify-center">
          {qty}
        </p>

        <motion.div
          whileTap={{ scale: 0.75 }}
          onClick={() => updateQty("add", item?.id)}
        >
          <BiPlus className="text-gray-50" />
        </motion.div>
      </div>
    </div>
  );
};

export default CartItem;
