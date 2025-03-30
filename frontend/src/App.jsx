import { Box } from '@chakra-ui/react';
import { Route, Routes } from 'react-router-dom';
import CreatePage from './pages/CreatePage';
import HomePage from './pages/HomePage';
import UserPage from './pages/UserPage';
import RemovePage from './pages/RemovePage';
import Navbar from './components/Navbar';
import { useFoodStore } from './store/food';
import { useColorModeValue } from '@chakra-ui/react';

function App() {
  const {foodList}=useFoodStore()

  return (
    <>
      <Box minH={"100vh"} bg = {useColorModeValue("gray.100", "gray.900")}>
        <Navbar />
          <Routes>
            <Route path="/user" element={<UserPage />} />
            <Route path= "/" element={<HomePage />}/>
            <Route path= "/addFood" element={<CreatePage />}/>
            <Route path= "/removeFood" element={<RemovePage />}/>
        </Routes>
      </Box>
    </>
  );
}

export default App;
