// src/App.js
import React from 'react';
import Game from './components/Game';
import Container from '@mui/material/Container';
import './App.css';

function App() {
  return (
    <Container maxWidth="sm" sx={{ textAlign: 'center', mt: 4 }}>
      <Game />
    </Container>
  );
}

export default App;
