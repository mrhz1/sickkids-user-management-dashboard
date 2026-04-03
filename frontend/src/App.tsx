import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { LayoutProvider } from './components/organisms/LayoutContext';
import { MainLayout } from './components/organisms/MainLayout';
import { DashboardPage } from './features/dashboard/DashboardPage';
import { UsersPage } from './features/users/UsersPage';

function App() {
  return (
    <Router>
      <LayoutProvider>
        <MainLayout>
          <Routes>
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/users" element={<UsersPage />} />
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </MainLayout>
      </LayoutProvider>
    </Router>
  );
}

export default App;
