import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Header from "./components/Header/Header";
import MainContainer from "./components/MainConainer/MainContainer";
import CreateContainer from "./components/CreateContainer/CreateContainer";
import Footer from "./components/Footer/Footer";
import SummaryPage from "./components/SummaryPage/SummaryPage";
import PaymentConfirmationPage from "./components/PaymentConfirmationPage/PaymentConfirmationPage";
import MyOrders from "./components/MyOrders/MyOrders"; // Importa el componente MisOrdenes
import { useStateValue } from "./context/StateProvider";
import { getAllFoodItems } from "./utils/firebaseFunctions";
import { actionType } from "./context/reducer";

const App = () => {
  const [{ foodItems }, dispatch] = useStateValue();

  const fetchData = async () => {
    await getAllFoodItems().then((data) => {
      dispatch({
        type: actionType.SET_FOOD_ITEMS,
        foodItems: data,
      });
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <AnimatePresence exitBeforeEnter>
      <div className="w-screen h-auto flex flex-col bg-primary">
        <Header />

        <main className="mt-14 md:mt-20 px-4 md:px-16 py-4 w-full">
          <Routes>
            <Route path="/" element={<MainContainer />} />
            <Route path="/createItem" element={<CreateContainer />} />
            <Route path="/summary" element={<SummaryPage />} />
            <Route
              path="/payment-confirmation"
              element={<PaymentConfirmationPage />}
            />
            <Route path="/mis-ordenes" element={<MyOrders />} /> {/* Agrega la ruta para MisOrdenes */}
          </Routes>
        </main>
        <Footer />
      </div>
    </AnimatePresence>
  );
};

export default App;
