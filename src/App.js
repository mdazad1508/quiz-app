import React,{useEffect} from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import { useNavigate } from "react-router-dom";

const App = () => {

 
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home/>}></Route>
        <Route exact path="/login" element={<Login />}></Route>
      </Routes>
    </Router>
  );
};

export default App;
