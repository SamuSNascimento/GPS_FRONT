import { createTheme } from '@mui/material';

const theme = createTheme({
  components: {
    MuiInputBase: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: '#6f43d8',
            borderRadius: '10px',
          },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            border: 'solid 2px #6f43d8 !important',
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: '#6f43d8 !important',
            color: '#6f43d8 !important',
          },
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          '&.Mui-focused': {
            color: '#6f43d8',
          },
        },
      },
    },
    MuiCheckbox: {
      styleOverrides: {
        root: {
          color: '#6f43d8',
          '&.Mui-checked': {
            color: '#6f43d8',
          },
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          marginTop: '20px',
          marginBottom: '5px',
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          color: '#30373E',
          gap: '8px',
          marginTop: '5px',
          marginBottom: '5px',
        },
      },
    },
  },
});

export default theme;
