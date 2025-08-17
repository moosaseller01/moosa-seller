import React from 'react';
import { useState } from 'react';
import Spline from '@splinetool/react-spline';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Header from './components/Header';
import HomePage from './components/HomePage';
import AuthForm from './components/AuthForm';
import BuyAccounts from './components/BuyAccounts';
import SellAccount from './components/SellAccount';
import AdminDashboard from './components/AdminDashboard';

function App() {
  return (
    <AuthProvider>
      <div className="min-h-screen relative">
        <div className="fixed inset-0 -z-10">
          <Spline 
            scene="https://prod.spline.design/jWbkKwQ1eqNMIm91/scene.splinecode"
            style={{ width: '100%', height: '100%' }}
          />
          <div className="absolute inset-0 bg-black/20" />
        </div>
        <AppContent />
      </div>
    </AuthProvider>
  );
}

const AppContent: React.FC = () => {
  const [currentView, setCurrentView] = useState('home');
  const { user } = useAuth();

  const renderCurrentView = () => {
    if (!user && (currentView === 'sell' || currentView === 'admin')) {
      return <AuthForm onSuccess={() => setCurrentView('home')} />;
    }

    switch (currentView) {
      case 'auth':
        return <AuthForm onSuccess={() => setCurrentView('home')} />;
      case 'buy':
        return <BuyAccounts setCurrentView={setCurrentView} />;
      case 'sell':
        return <SellAccount setCurrentView={setCurrentView} />;
      case 'admin':
        return user?.role === 'admin' ? <AdminDashboard /> : <HomePage setCurrentView={setCurrentView} />;
      default:
        return <HomePage setCurrentView={setCurrentView} />;
    }
  };

  return (
    <>
      <Header currentView={currentView} setCurrentView={setCurrentView} />
      {renderCurrentView()}
    </>
  );
};

export default App;
