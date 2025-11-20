import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { Book, Star, Clock, Wrench } from 'lucide-react';
import Home from './pages/Home';
import Protocols from './pages/Protocols';
import ProtocolView from './pages/ProtocolView';
import Favorites from './pages/Favorites';
import Recents from './pages/Recents';
import Tools from './pages/Tools';
import Directory from './pages/Directory';
import Calculators from './pages/Calculators';
import Checklists from './pages/Checklists';
import Algorithms from './pages/Algorithms';
import Medications from './pages/Medications';
import Feedback from './pages/Feedback';

function Layout() {
  const location = useLocation();

  // Don't show bottom nav on Home page if that's the design, 
  // BUT the requirement says "The app main screen... has 3 tabs at the bottom".
  // So we show it everywhere.

  return (
    <div className="app-layout">
      <div className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/protocols" element={<Protocols />} />
          <Route path="/protocol/:id" element={<ProtocolView />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/recents" element={<Recents />} />
          <Route path="/tools" element={<Tools />} />
          <Route path="/directory" element={<Directory />} />
          <Route path="/calculators" element={<Calculators />} />
          <Route path="/checklists" element={<Checklists />} />
          <Route path="/algorithms" element={<Algorithms />} />
          <Route path="/medications" element={<Medications />} />
          <Route path="/feedback" element={<Feedback />} />
        </Routes>
      </div>

      <nav className="bottom-nav">
        <NavLink to="/protocols" icon={<Book size={24} />} label="Protocols" active={location.pathname.startsWith('/protocols') || location.pathname.startsWith('/protocol')} />
        <NavLink to="/favorites" icon={<Star size={24} />} label="Favorites" active={location.pathname === '/favorites'} />
        <NavLink to="/recents" icon={<Clock size={24} />} label="Recents" active={location.pathname === '/recents'} />
        <NavLink to="/tools" icon={<Wrench size={24} />} label="Tools" active={location.pathname.startsWith('/tools') || location.pathname.startsWith('/directory') || location.pathname.startsWith('/calculators')} />
      </nav>
    </div>
  );
}

function NavLink({ to, icon, label, active }) {
  return (
    <Link to={to} className={`nav-item ${active ? 'active' : ''}`}>
      {icon}
      <span>{label}</span>
    </Link>
  );
}

function App() {
  return (
    <Router>
      <Layout />
    </Router>
  );
}

export default App;
