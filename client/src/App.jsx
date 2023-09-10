import { useState, Suspense, lazy } from "react";

import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import "./App.scss";

import Navbar from "./components/Navbar";
import FooterM from "./components/Footer";
import Home from "./userPages/Home";
import Contact from "./components/Contact";
import Templates from "./userPages/Templates";
import Next from "./components/Next";
import Customizer from "./components/Customizer";
import Spinner from "./components/Spinner";
import { ContactProvider } from "./components/ContactContext";

const App = () => {
  const params = new URLSearchParams(window.location.search);
  const templateid = params.get("id");
  const type = params.get("type");
  console.log(templateid);

  //login template
  const [selectedLoginTemplate, setSelectedLoginTemplate] =
    useState(templateid);
  const SelectedLoginTemplate = lazy(() =>
    import(`./templates/${type}/${selectedLoginTemplate}.jsx`)
  );

  //signup template
  const [selectedSignupTemplate, setSelectedSignupTemplate] =
    useState(templateid);
  const SelectedSignupTemplate = lazy(() =>
    import(`./templates/${type}/${selectedSignupTemplate}.jsx`)
  );

  //header template
  const [selectedHeaderTemplate, setSelectedHeaderTemplate] =
    useState(templateid);
  const SelectedHeaderTemplate = selectedHeaderTemplate
    ? lazy(() => import(`./templates/${type}/${selectedHeaderTemplate}.jsx`))
    : null;

  //footer template
  const [selectedFooterTemplate, setSelectedFooterTemplate] =
    useState(templateid);
  const SelectedFooterTemplate = selectedFooterTemplate
    ? lazy(() => import(`./templates/${type}/${selectedFooterTemplate}.jsx`))
    : null;

  return (
    <>
      <ContactProvider>
        <Router>
          <Navbar />

          <Contact />
          {window.location.pathname.includes("templates/") && (
            <>
              <Next />
              <Customizer />
            </>
          )}
          {/*      {SelectedHeaderTemplate && (
            <Suspense fallback={<div>Loading Header...</div>}>
              <SelectedHeaderTemplate />
            </Suspense>
          )}
          {SelectedFooterTemplate && (
            <Suspense fallback={<div>Loading Footer...</div>}>
              <SelectedFooterTemplate />
            </Suspense>
          )} */}

          <Routes>
            <Route
              path="/templates/login"
              element={
                <Suspense
                  fallback={
                    <div>
                      <Spinner />
                    </div>
                  }
                >
                  <SelectedLoginTemplate />
                </Suspense>
              }
            />
            <Route
              path="/templates/signup"
              element={
                <Suspense
                  fallback={
                    <div>
                      <Spinner />
                    </div>
                  }
                >
                  <SelectedSignupTemplate />
                </Suspense>
              }
            />
            <Route exact path="/home" element={<Home />} />
            <Route exact path="/" element={<Navigate replace to="/home" />} />
            <Route exact path="/templates" element={<Templates />} />
          </Routes>
          {window.location.pathname.includes("header") &&
            SelectedHeaderTemplate && (
              <Suspense
                fallback={
                  <div>
                    <Spinner />
                  </div>
                }
              >
                <SelectedHeaderTemplate />
              </Suspense>
            )}
          {window.location.pathname.includes("footer") &&
            SelectedFooterTemplate && (
              <Suspense
                fallback={
                  <div>
                    <Spinner />
                  </div>
                }
              >
                <SelectedFooterTemplate />
              </Suspense>
            )}
          <FooterM />
        </Router>
      </ContactProvider>
    </>
  );
};

export default App;
