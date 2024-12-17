import React from 'react';
    import ReactDOM from 'react-dom/client';
    import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
    import Dashboard from './components/Dashboard';
    import ChapterSceneView from './components/ChapterSceneView';
    import CharacterView from './components/CharacterView';
    import './index.css';

    const App = () => {
      return (
        <Router>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/chapter-scene" element={<ChapterSceneView />} />
            <Route path="/character" element={<CharacterView />} />
          </Routes>
        </Router>
      );
    };

    ReactDOM.createRoot(document.getElementById('root')).render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
