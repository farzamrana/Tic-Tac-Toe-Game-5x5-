// src/components/Square.js
import React from 'react';
import Button from '@mui/material/Button';

const Square = ({ value, onClick }) => {
  return (
    <Button
      variant="outlined"
      onClick={onClick}
      sx={{
        width: '60px',
        height: '60px',
        fontSize: '24px',
        fontWeight: 'bold',
        lineHeight: '60px',
        minWidth: '60px',
        padding: 0
      }}
    >
      {value}
    </Button>
  );
};

export default Square;
