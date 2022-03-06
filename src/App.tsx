import React from "react";
import Routes from "./routes";
import UserProvider from "./Context";

function App() {
  return (
    <UserProvider>
      <Routes />
    </UserProvider>
  );
}

export default App;
