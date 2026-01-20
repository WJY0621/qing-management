
import React, { useEffect } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider, useAppState } from './state.tsx';
import { SplashScreen } from '@capacitor/splash-screen';
import ErrorBoundary from './components/ErrorBoundary.tsx';
import Login from './pages/Login.tsx';
import Register from './pages/Register.tsx';
import Onboarding from './pages/Onboarding.tsx';
import Dashboard from './pages/Dashboard.tsx';
import RecipeList from './pages/RecipeList.tsx';
import RecipeEditor from './pages/RecipeEditor.tsx';
import WeightLog from './pages/WeightLog.tsx';
import Profile from './pages/Profile.tsx';
import ProfileEditor from './pages/ProfileEditor.tsx';
import ForgotPassword from './pages/ForgotPassword.tsx';
import UpdatePassword from './pages/UpdatePassword.tsx';

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isLoggedIn, isLoading } = useAppState();
  
  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-white">
        <div className="flex flex-col items-center gap-4">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-primary border-t-transparent" />
          <p className="text-sm font-bold text-slate-400">加载中...</p>
        </div>
      </div>
    );
  }
  
  if (!isLoggedIn) return <Navigate to="/login" replace />;
  return <>{children}</>;
};

const App: React.FC = () => {
  useEffect(() => {
    // Hide splash screen when app is mounted
    const hideSplash = async () => {
      try {
        await SplashScreen.hide();
      } catch (e) {
        // Ignore errors in non-native environments
      }
    };
    hideSplash();
  }, []);

  return (
    <ErrorBoundary>
      <AppProvider>
        <HashRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/update-password" element={<UpdatePassword />} />
            <Route path="/onboarding" element={<ProtectedRoute><Onboarding /></ProtectedRoute>} />
            <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/recipes" element={<ProtectedRoute><RecipeList /></ProtectedRoute>} />
            <Route path="/recipes/new" element={<ProtectedRoute><RecipeEditor /></ProtectedRoute>} />
            <Route path="/recipes/edit/:id" element={<ProtectedRoute><RecipeEditor /></ProtectedRoute>} />
            <Route path="/log" element={<ProtectedRoute><WeightLog /></ProtectedRoute>} />
            <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
            <Route path="/profile/edit" element={<ProtectedRoute><ProfileEditor /></ProtectedRoute>} />
            
            {/* Admin Routes */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<Navigate to="/admin/dashboard" replace />} />
              <Route path="dashboard" element={<AdminDashboard />} />
              <Route path="users" element={<UserManagement />} />
              <Route path="recipes" element={<RecipeManagement />} />
            </Route>

            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        </HashRouter>
      </AppProvider>
    </ErrorBoundary>
  );
};

export default App;
