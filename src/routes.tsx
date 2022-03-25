import React from "react";
import { useContext } from "react";
import { UserContext } from "./Context";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./Pages/Login";
import SignIn from "./Pages/SignIn";
import Dashboard from "./Pages/Dashboard";
import Menu from "./Components/Menu";
import Home from "./Pages/Home";
import Modal from "./Components/Modal";
import Toast from "./Components/Toast";
import { Svg } from "./Components/Commom/components";

//Conferir: https://github.com/remix-run/react-router/blob/main/docs/getting-started/tutorial.md
//Houve mudança no modo de utilização

const RoutesPerson = () => {
  const { user } = useContext(UserContext);
  return (
    <BrowserRouter>
      <Menu />
      <Svg />
      <Modal />
      <Toast />
      <Routes>
        <Route path="/" element={user?.token == null ? <Login /> : <Home />} />
        <Route path="/dashboard" element={user?.token == null ? <Login /> : <Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/sign-in" element={<SignIn />} />
        { /*<Route path="/home/:email" element={<Dashboard />} /> */}
        <Route path="*" element={<h1>Olha só, essa página não existe</h1>} />
      </Routes>
    </BrowserRouter>
  );
};

export default RoutesPerson;
