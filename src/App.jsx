import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { Book, Star, Clock } from 'lucide-react';
import Home from './pages/Home';
import Protocols from './pages/Protocols';
import ProtocolView from './pages/ProtocolView';
import Favorites from './pages/Favorites';
import Recents from './pages/Recents';

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
        </Routes>
      </div>
      
      <nav className="bottom-nav">
        <NavLink to="/protocols" icon={<Book size={24} />} label="Protocols" active={location.pathname.startsWith('/protocols') || location.pathname.startsWith('/protocol')} />
        <NavLink to="/favorites" icon={<Star size={24} />} label="Favorites" active={location.pathname === '/favorites'} />
        <NavLink to="/recents" icon={<Clock size={24} />} label="Recents" active={location.pathname === '/recents'} />
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
