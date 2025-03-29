import { Box } from '@chakra-ui/react';
import { Route, Routes } from 'react-router-dom';
import CreatePage from './pages/CreatePage';
import HomePage from './pages/HomePage';
import Navbar from './components/Navbar';
import { useFoodStore } from './store/food';
import { useColorModeValue } from '@chakra-ui/react';

function App() {
  const {foods}=useFoodStore()

  return (
    <>
      <Box minH={"100vh"} bg = {useColorModeValue("gray.100", "gray.900")}>
        <Navbar />
          <Routes>
            <Route path= "/" element={<HomePage />}/>
            <Route path= "/create" element={<CreatePage />}/>
        </Routes>
      </Box>
    </>
  );
}

export default App;
