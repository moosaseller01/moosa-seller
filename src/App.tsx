import React from 'react';
import { useState } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Header from './components/Header';
import HomePage from './components/HomePage';
import AuthForm from './components/AuthForm';
import BuyAccounts from './components/BuyAccounts';
import SellAccount from './components/SellAccount';
import AdminDashboard from './components/AdminDashboard';
import AnimatedBackground from './components/AnimatedBackground';
import ChatSystem from './components/ChatSystem';

function App() {
  return (
    <AuthProvider>
      <div className="min-h-screen relative">
        <AnimatedBackground />
        <AppContent />
      </div>
    </AuthProvider>
  );
}

const AppContent: React.FC = () => {
  const [currentView, setCurrentView] = useState('home');
  const { user } = useAuth();

  const renderCurrentView = () => {
    if (!user && (currentView === 'sell' || currentView === 'admin' || currentView === 'chat')) {
      return <AuthForm onSuccess={() => setCurrentView('home')} />;
    }

    switch (currentView) {
      case 'auth':
        return <AuthForm onSuccess={() => setCurrentView('home')} />;
      case 'buy':
        return <BuyAccounts setCurrentView={setCurrentView} />;
      case 'sell':
        return <SellAccount setCurrentView={setCurrentView} />;
      case 'chat':
        return <ChatSystem setCurrentView={setCurrentView} />;
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
