import { useState, Suspense, lazy } from "react";

import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import "./App.scss";
import Login from "./userPages/Login";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./userPages/Home";
import Contact from "./components/Contact";
import Templates from "./userPages/Templates";
import Next from "./components/Next";

const App = () => {
  const params = new URLSearchParams(window.location.search);
  const templateid = params.get("id");
  const type = params.get("type");

  console.log(templateid);
  const [selectedLoginTemplate, setSelectedLoginTemplate] = useState(
    templateid == 1 ? "1" : ""
  );
  const SelectedLoginTemplate = lazy(() =>
    import(`./templates/${type}/${selectedLoginTemplate}.jsx`)
  );

  return (
    <>
      <Router>
        <Navbar />

        <Contact />
        {window.location.pathname.includes("templates/") && <Next />}

        <Routes>
          {/*   <Route exact path="/login" element={<Login />} /> */}
          <Route
            path="/templates/login"
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <SelectedLoginTemplate />
              </Suspense>
            }
          />
          <Route exact path="/home" element={<Home />} />
          <Route exact path="/" element={<Navigate replace to="/home" />} />
          <Route exact path="/templates" element={<Templates />} />
        </Routes>
        <Footer />
      </Router>
    </>
  );
};

export default App;
