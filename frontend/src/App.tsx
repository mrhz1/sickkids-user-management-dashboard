import './App.css';
import { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import LoginPage from './pages/Auth/LoginPage';
import RegisterPage from './pages/Auth/RegisterPage';
import UserManagementPage from './pages/UserManagementPage';

/**
 * Router component to handle page navigation
 */
function Router() {
  const { isAuthenticated, isAuthLoading } = useAuth();
  const [currentPage, setCurrentPage] = useState(window.location.pathname);

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPage(window.location.pathname);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const NavigateTo = (path: string) => {
    setCurrentPage(path);
    window.history.pushState({}, '', path);
  };

  // Handle intercepting link clicks
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest('a');
      if (target?.href && target.href.startsWith(window.location.origin)) {
        e.preventDefault();
        const path = target.href.replace(window.location.origin, '');
        NavigateTo(path);
      }
    };

    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);

  // Show loading state
  if (isAuthLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-gray-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // Route to different pages
  if (!isAuthenticated) {
    if (currentPage === '/register') {
      return <RegisterPage onRegisterSuccess={() => NavigateTo('/login')} />;
    }
    return <LoginPage onLoginSuccess={() => NavigateTo('/dashboard')} />;
  }

  if (currentPage === '/login' || currentPage === '/register') {
    return <UserManagementPage />;
  }

  return <UserManagementPage />;
}

/**
 * Main App component
 */
function App() {
  return (
    <AuthProvider>
      <Router />
    </AuthProvider>
  );
}

export default App;
