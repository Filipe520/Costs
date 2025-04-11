import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/pages/Home/Home";
import Contact from "./components/pages/Contact";
import Company from "./components/pages/Company";
import Container from "./components/layout/Container/Container";
import Projects from "./components/pages/Projects/Projects";
import NewProject from "./components/pages/NewProject/NewProject";
import Project from "./components/pages/Project/Project";

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
          <Route path="/project/:id" element={<Project />} />
        </Routes>
      </Container>

      <Footer></Footer>
    </Router>
  );
};

export default App;
