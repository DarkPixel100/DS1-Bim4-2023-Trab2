import React from "react";
import { Outlet } from "react-router-dom";
import PortalHeader from "./portal/header/PortalHeader";
function App() {
  return (
    <React.Fragment>
      <PortalHeader />
      <Outlet />
    </React.Fragment>
  );
}
export default App;