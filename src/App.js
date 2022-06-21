import "./App.css";
import Navbar from "./components/Navbar";
import Crud from "./crud/Crud";
import "./assets/css/mystyle.css";
import "./assets/css/tabel.css";
import Graph from "./components/Graph";
import Home from "./components/Home";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/crud" element={<Crud />} />
          <Route path="/graph" element={<Graph />} />
        </Routes>
      </div>

    </div>
  );
}

export default App;
