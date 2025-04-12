import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingNavbar from "./components/LandingNavbar";
import Landing from "./pages/Landing";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import Footer from "./components/Footer";

const App = () => (
  <BrowserRouter>
    <LandingNavbar />
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/signin" element={<Signin />} />
      <Route path="/signup" element={<Signup />} />
    </Routes>
    <Footer />
  </BrowserRouter>
);

export default App;
