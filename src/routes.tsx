import React from "react";
import { useContext } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { UserContext } from "./Context";
import Dashboard from "./Pages/Dashboard";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import NotFound from "./Pages/NotFound";
import SignIn from "./Pages/SignIn";
import Unauthorized from "./Pages/Unauthorized";
import Menu from "./Components/Menu";
import { Svg } from "./Components/Commom/components";

//Conferir: https://github.com/remix-run/react-router/blob/main/docs/getting-started/tutorial.md
//Houve mudança no modo de utilização do react-router-dom

const FullRoutes = () => {
  const { user } = useContext(UserContext);
  return (
    <BrowserRouter>
      <Menu />
      <Svg />
      <Routes>
        <Route path="/" element={user?.token == null ? <Unauthorized /> : <Home />} />
        <Route path="/dashboard" element={user?.token == null ? <Unauthorized /> : <Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default FullRoutes;