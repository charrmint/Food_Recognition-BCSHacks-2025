import { Box } from '@chakra-ui/react';
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

function App() {
  const {foodList}=useFoodStore()

  return (
    <>
      <Box minH={"100vh"} bg = {useColorModeValue("gray.100", "gray.900")}>
        <Navbar />
          <Routes>
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/login" element={<LogIn />} />
            <Route path= "/" element={<HomePage />}/>
            <Route path= "/addFood" element={<CreatePage />}/>
            <Route path= "/AskPage" element={<AskPage />}/>
            <Route path= "/removeFood" element={<RemovePage />}/>
        </Routes>
      </Box>
    </>
  );
}

export default App;
