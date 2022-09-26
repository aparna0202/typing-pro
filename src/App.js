import Textscreen from "./Components/Textscreen/Textscreen";
import "./App.css";
import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";
import { Route, Routes } from "react-router-dom";
import HistoryPage from "./Components/HistoryPage/HistoryPage";
function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/home" element={<Textscreen />} />
        <Route path="/history" element={<HistoryPage />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
