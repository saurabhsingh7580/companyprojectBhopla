import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Emplregistration from "./components/Emplregistration.";
import "mdb-react-ui-kit/dist/css/mdb.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AllEmployeeView from "./components/AllEmployeeView";
// import '~mdb-ui-kit/css/mdb.min.css';
import UpdateEmployeeData from "./components/UpdateEmployeeData";
import DropDownUserView from "./components/DropDownUserView";

const App = () => {
  return (
    <div>
      <ToastContainer autoClose={2000} />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AllEmployeeView />} />
          <Route path="/registra" element={<Emplregistration />} />
          <Route path="/registraupdate" element={<UpdateEmployeeData />} />
          <Route path="/userview" element={<DropDownUserView />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
