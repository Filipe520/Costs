import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import NewProject from './pages/NewProject';
import Contact from './pages/Contact';
import Company from './pages/Company';
import Container from './components/layout/Container';

const App = () => {
  return (
    <Router>
      <div>
        <Link to='/'>Home</Link>
        <Link to="/contato">Contato</Link>
        <Link to="/company">Empresa</Link>
        <Link to="/newprojeto">Novo projeto</Link>
      </div>

      <Container customClass="min-height">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contato" element={<Contact />} />
          <Route path="/company" element={<Company />} />
          <Route path="/newprojeto" element={<NewProject />} />
        </Routes>
      </Container>

      <footer>Footer</footer>
    </Router>
  );
};

export default App;
