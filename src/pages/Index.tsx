
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Auth } from './Auth';
import { Dashboard } from './Dashboard';

const Index = () => {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? <Dashboard /> : <Auth />;
};

export default Index;
