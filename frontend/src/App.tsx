import './App.css';
import { LayoutProvider } from './components/organisms/LayoutContext';
import { MainLayout } from './components/organisms/MainLayout';
import { DashboardPage } from './features/dashboard/DashboardPage';

function App() {
  return (
    <LayoutProvider>
      <MainLayout>
        <DashboardPage />
      </MainLayout>
    </LayoutProvider>
  );
}

export default App;
