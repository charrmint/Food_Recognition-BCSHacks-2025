import { Box } from '@chakra-ui/react';
import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import CreatePage from './features/CreatePage';
import AskPage from './features/AskPage';
import HomePage from './features/HomePage';
import SignupPage from './features/feature-sets/SignUp/presenter/SignupPagePresenter';
import RemovePage from './features/RemovePage';
import Navbar from './components/Navbar';
import LogIn from './features/LogIn';
import { useFoodStore } from './store/FoodStore/food';
import { useColorModeValue } from '@chakra-ui/react';
import AuthPagePresenter from './features/feature-sets/Auth/presenter/AuthPagePresenter';
import OAuthCallback from './features/feature-sets/Auth/presenter/OAuthCallbackPresenter';
import OAuthCallbackPresenter from './features/feature-sets/Auth/presenter/OAuthCallbackPresenter';
import { useAuthStore } from './store/AuthStore';
import ProtectedRoute from './components/ProtectedRoute';

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
          <HomePage />
        </ProtectedRoute>
      } />

      <Route path= "/addFood" element={
        <ProtectedRoute>
          <CreatePage />
        </ProtectedRoute>
      } />

      <Route path= "/AskPage" element={
        <ProtectedRoute>
          <AskPage />
        </ProtectedRoute>
      } />

      <Route path= "/removeFood" element={
        <ProtectedRoute>
          <RemovePage />
        </ProtectedRoute>
      } />
    </Routes>
  )
}

export default App
