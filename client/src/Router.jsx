// Import Statements
import React, { Suspense, useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useAuthStore } from './store/authStore';
import LoadingSpinner from './components/animations/loader/LoadingSpinner';

// Layouts
import UserLayout from './layouts/UserLayout';
import UserAuthLayout from './layouts/UserAuthLayout';

// Common Pages
import NotFoundPage from './pages/NotFoundPage';

// Protected Routes
import ProtectedRoute from './routes/ProtectedRoute';
import RedirectAuthenticatedUsers from './routes/RedirectAuthenticatedUsers';

// User Auth Pages
import LoginPage from './pages/authPages/LoginPage';
import SignUpPage from './pages/authPages/SignUpPage';
import ForgotPasswordPage from './pages/authPages/ForgotPasswordPage';
import ResetPasswordPage from './pages/authPages/ResetPasswordPage';
import EmailVerificationPage from './pages/authPages/EmailVerificationPage';
import PostPage from './pages/PostPage';

// Lazy-loaded Pages
const ProfileEditPage = React.lazy(() => import('./pages/ProfileEditPagez'));

export default function Router() {
  const { checkAuth, isCheckingAuth } = useAuthStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => setLoading(false), 3000);
    checkAuth();

    return () => clearTimeout(timeout);
  }, [checkAuth]);

  if (loading) {
    return (
      <div className='flex items-center justify-center h-screen'>
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Routes>
        <Route element={<UserLayout />}>
          <Route
            index
            path='/'
            element={
              <ProtectedRoute>
                <PostPage />
              </ProtectedRoute>
            }
          />

          <Route
            path='/profile/edit'
            element={
              <ProtectedRoute>
                <ProfileEditPage />
              </ProtectedRoute>
            }
          />
        </Route>

        {/* Auth Routes */}
        <Route element={<UserAuthLayout />}>
          <Route
            path='/login'
            element={
              <RedirectAuthenticatedUsers>
                <LoginPage />
              </RedirectAuthenticatedUsers>
            }
          />
          <Route
            path='/signup'
            element={
              <RedirectAuthenticatedUsers>
                <SignUpPage />
              </RedirectAuthenticatedUsers>
            }
          />
          <Route path='/forget-password' element={<ForgotPasswordPage />} />
          <Route
            path='/reset-password/:token'
            element={<ResetPasswordPage />}
          />
          <Route path='/verify-email' element={<EmailVerificationPage />} />
        </Route>
        {/*404 Page */}
        <Route path='*' element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  );
}
