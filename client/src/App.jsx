import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import "./App.scss";
import Login from "./userPages/Login";
import Login1 from "./userPages/Login1";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./userPages/Home";
import Contact from "./components/Contact";

const App = () => {
  return (
    <>
      <Router>
        <Navbar />

        <Contact />
        <Routes>
          <Route exact path="/login" element={<Login1 />} />
          <Route exact path="/home" element={<Home />} />
          <Route exact path="/" element={<Navigate replace to="/home" />} />
        </Routes>
        <Footer />
      </Router>
    </>
  );
};

export default App;
