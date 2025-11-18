import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Dashboard } from './pages/Dashboard';
import { Expenses } from './pages/Expenses';
import { Goals } from './pages/Goals';
import { Reports } from './pages/Reports';
import { Settings } from './pages/Settings';
import { Budget } from './pages/Budget';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/expenses" element={<Expenses />} />
          <Route path="/goals" element={<Goals />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/budget" element={<Budget />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;