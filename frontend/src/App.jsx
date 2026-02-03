
import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import AuthPagePresenter from './features/feature-sets/Auth/presenter/AuthPagePresenter';
import OAuthCallbackPresenter from './features/feature-sets/Auth/presenter/OAuthCallbackPresenter';
import { useAuthStore } from './store/AuthStore';
import ProtectedRoute from './components/ProtectedRoute';
import DashboardPresenter from './features/feature-sets/Dashboard/presenter/DashboardPresenter';

function App() {
  const fetchMe = useAuthStore((state) => state.fetchMe)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      fetchMe()
    } else {
      useAuthStore.setState({ loadingUser: false })
    }
  }, [fetchMe])

  return (
    <Routes>
      <Route path="/auth" element={<AuthPagePresenter />}/>
      <Route path="/auth/callback" element={<OAuthCallbackPresenter />}/>
      <Route path= "/" element={
        <ProtectedRoute>
          <DashboardPresenter />
        </ProtectedRoute>
      } />
    </Routes>
  )
}

export default App
