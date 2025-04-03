import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home/Home";
import Contact from "./pages/Contact";
import Company from "./pages/Company";
import Container from "./components/layout/Container/Container";
import Projects from "./pages/Projects";
import NewProject from "./pages/NewProject/NewProject";

import NavBar from "./components/layout/NavBar/NavBar";
import Footer from "./components/layout/Footer/Footer";

const App = () => {
  return (
    <Router>
      <NavBar />
      <Container customClass="min-height">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/contato" element={<Contact />} />
          <Route path="/company" element={<Company />} />
          <Route path="/newproject" element={<NewProject />} />
        </Routes>
      </Container>

      <Footer></Footer>
    </Router>
  );
};

export default App;
