import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import "./App.scss";
import Login from "./userPages/Login";

const App = () => {
  return (
    <>
      <Router>
        {/*   <Navbar /> */}

        <Routes>
          <Route exact path="/login" element={<Login />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;