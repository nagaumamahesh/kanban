import './App.css';
import { extendTheme, ChakraProvider } from '@chakra-ui/react';
import React from 'react';  
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';  
import Homepage from './components/Homepage';

const colors = {
  brand: {
    900: '#1a365d',
    800: '#153e75',
    700: '#2a69ac',
  },
}

const theme = extendTheme({ colors })

function App() {
  return (
    <ChakraProvider theme={theme}> 
      <BrowserRouter>
        <div className="App">
          {/* <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
            </ul>
          </nav> */}

          <Routes>
            <Route path="/" element={<Homepage />} />
          </Routes>
        </div>
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;
