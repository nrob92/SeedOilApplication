import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import "react-toastify/dist/ReactToastify.css";
import NavBar from "./Components/NavBar";
import HomePage from "./pages/HomePage";
import Profile from "./pages/Profile";
import { AppContextProvider } from "./Contexts/AppContext";
import MobileFooter from "./Components/footer/MobileFooter";

function App() {
  return (
    <BrowserRouter>
      <AppContextProvider>
        <NavBar />
        <Routes>
          <Route path="/" element={<HomePage />}></Route>
          <Route path="/home" element={<Home />}></Route>
          <Route path="/profile" element={<Profile />}></Route>
        </Routes>
        <MobileFooter />
      </AppContextProvider>
    </BrowserRouter>
  );
}

export default App;
