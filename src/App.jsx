import React, { useEffect, useMemo, useReducer } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { Bean, BookOpenText, Star, Clock, House } from 'lucide-react';
import Home from './pages/Home';
import Protocols from './pages/Protocols';
import ProtocolView from './pages/ProtocolView';
import Favorites from './pages/Favorites';
import Recents from './pages/Recents';
import Tools from './pages/Tools';
import Directory from './pages/Directory';
import Calculators from './pages/Calculators';
import CalculatorView from './pages/CalculatorView';
import Checklists from './pages/Checklists';
import Algorithms from './pages/Algorithms';
import Medications from './pages/Medications';
import MedicationView from './pages/MedicationView';
import Feedback from './pages/Feedback';
import ChecklistView from './pages/ChecklistView';
import ProtocolFiles from './pages/ProtocolFiles';
import AlgorithmView from './pages/AlgorithmView';
import CptCodes from './pages/CptCodes';
import { addToRecents, isFavorite, toggleFavorite } from './utils/storage';
import { getTrackableEntryByPath } from './data/trackableEntries';

function Layout() {
  const location = useLocation();
  const [, forceRerender] = useReducer((value) => value + 1, 0);
  const currentTrackableEntry = useMemo(
    () => getTrackableEntryByPath(location.pathname),
    [location.pathname]
  );

  useEffect(() => {
    if (currentTrackableEntry) {
      addToRecents(currentTrackableEntry.key);
    }
  }, [currentTrackableEntry]);

  const handleToggleCurrentFavorite = () => {
    if (!currentTrackableEntry) {
      return;
    }

    toggleFavorite(currentTrackableEntry.key);
    forceRerender();
  };

  const currentEntryIsFavorite = currentTrackableEntry
    ? isFavorite(currentTrackableEntry.key)
    : false;

  return (
    <div className="app-layout">
      <div className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/resources" element={<Protocols />} />
          <Route path="/protocols" element={<Protocols />} />
          <Route path="/resources/:id" element={<ProtocolView />} />
          <Route path="/protocol/:id" element={<ProtocolView />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/recents" element={<Recents />} />
          <Route path="/tools" element={<Tools />} />
          <Route path="/directory" element={<Directory />} />
          <Route path="/calculators" element={<Calculators />} />
          <Route path="/calculators/:id" element={<CalculatorView />} />
          <Route path="/checklists" element={<Checklists />} />
          <Route path="/checklists/:id" element={<ChecklistView />} />
          <Route path="/algorithms" element={<Algorithms />} />
          <Route path="/algorithms/:id" element={<AlgorithmView />} />
          <Route path="/medications" element={<Medications />} />
          <Route path="/medications/:id" element={<MedicationView />} />
          <Route path="/feedback" element={<Feedback />} />
          <Route path="/protocol-files" element={<ProtocolFiles />} />
          <Route path="/documentation/cpt-codes" element={<CptCodes />} />
        </Routes>
      </div>
      {location.pathname !== '/' && currentTrackableEntry && (
        <button
          type="button"
          className="favorite-shortcut"
          aria-label={currentEntryIsFavorite ? 'Remove from favorites' : 'Add to favorites'}
          onClick={handleToggleCurrentFavorite}
        >
          <Star
            size={20}
            fill={currentEntryIsFavorite ? '#eab308' : 'none'}
            color={currentEntryIsFavorite ? '#eab308' : 'var(--text-secondary)'}
          />
        </button>
      )}
      {location.pathname !== '/' && (
        <Link to="/" className="home-shortcut" aria-label="Go to home">
          <House size={20} />
        </Link>
      )}

      <nav className="bottom-nav">
        <NavLink to="/tools" icon={<Bean size={24} />} label="Menu" active={location.pathname.startsWith('/tools') || location.pathname.startsWith('/directory') || location.pathname.startsWith('/calculators') || location.pathname.startsWith('/checklists') || location.pathname.startsWith('/algorithms') || location.pathname.startsWith('/medications') || location.pathname.startsWith('/protocol-files') || location.pathname.startsWith('/feedback') || location.pathname.startsWith('/documentation')} />
        <NavLink to="/favorites" icon={<Star size={24} />} label="Favorites" active={location.pathname === '/favorites'} />
        <NavLink to="/recents" icon={<Clock size={24} />} label="Recents" active={location.pathname === '/recents'} />
        <NavLink to="/resources" icon={<BookOpenText size={24} />} label="Resources" active={location.pathname.startsWith('/resources') || location.pathname.startsWith('/protocol') || location.pathname.startsWith('/protocols')} />
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
