import Header from "./components/Header";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Show from "./pages/Show";

function App() {
  return (
    <Router>
      <div className="App ">
        <div className="overflow-hidden wrapper">
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/show" element={<Show />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
