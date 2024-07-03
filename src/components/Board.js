// src/components/Board.js
import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Square from './Square';
import { motion, AnimatePresence } from 'framer-motion';

const Board = () => {
  const [squares, setSquares] = useState(Array(25).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [winner, setWinner] = useState(null);
  const [showPlayAgain, setShowPlayAgain] = useState(false);

  useEffect(() => {
    const win = calculateWinner(squares);
    if (win) {
      setWinner(win);
      setShowPlayAgain(true);
    } else if (!squares.includes(null)) {
      setShowPlayAgain(true);
    }
  }, [squares]);

  const handleClick = (index) => {
    const newSquares = squares.slice();
    if (winner || newSquares[index]) {
      return;
    }
    newSquares[index] = isXNext ? 'X' : 'O';
    setSquares(newSquares);
    setIsXNext(!isXNext);
  };

  const handlePlayAgain = () => {
    setSquares(Array(25).fill(null));
    setIsXNext(true);
    setWinner(null);
    setShowPlayAgain(false);
  };

  const renderSquare = (index) => {
    return (
      <Square
        value={squares[index]}
        onClick={() => handleClick(index)}
        key={index}
      />
    );
  };

  const status = winner ? `Winner: ${winner}` : `Next player: ${isXNext ? 'X' : 'O'}`;

  return (
    <Box sx={{ textAlign: 'center', mt: 4 }}>
      <Typography variant="h4" gutterBottom>{status}</Typography>
      <Box>
        {[0, 1, 2, 3, 4].map(row => (
          <Box key={row} sx={{ display: 'flex', justifyContent: 'center' }}>
            {[0, 1, 2, 3, 4].map(col => renderSquare(row * 5 + col))}
          </Box>
        ))}
      </Box>
      <AnimatePresence>
        {showPlayAgain && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}>
              <Button 
                variant="contained" 
                color="primary" 
                onClick={handlePlayAgain}
                sx={{ 
                  padding: '10px 20px', 
                  fontSize: '16px', 
                  fontWeight: 'bold', 
                  backgroundColor: '#1976d2', 
                  '&:hover': {
                    backgroundColor: '#115293'
                  }
                }}
              >
               <h6> Play Again</h6>
              </Button>
            </Box>
          </motion.div>
        )}
      </AnimatePresence>
    </Box>
  );
};

const calculateWinner = (squares) => {
  const lines = [
    // Horizontal lines
    [0, 1, 2, 3, 4],
    [5, 6, 7, 8, 9],
    [10, 11, 12, 13, 14],
    [15, 16, 17, 18, 19],
    [20, 21, 22, 23, 24],
    // Vertical lines
    [0, 5, 10, 15, 20],
    [1, 6, 11, 16, 21],
    [2, 7, 12, 17, 22],
    [3, 8, 13, 18, 23],
    [4, 9, 14, 19, 24],
    // Diagonal lines
    [0, 6, 12, 18, 24],
    [4, 8, 12, 16, 20]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c, d, e] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c] && squares[a] === squares[d] && squares[a] === squares[e]) {
      return squares[a];
    }
  }
  return null;
};

export default Board;
