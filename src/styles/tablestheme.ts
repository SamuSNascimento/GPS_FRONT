import { createTheme } from '@mui/material';
import { ptBR } from '@mui/x-data-grid';
import type {} from '@mui/x-data-grid/themeAugmentation';

export const tablesTheme = createTheme(
  {
    components: {
      MuiDataGrid: {
        styleOverrides: {
          root: {
            border: 'none',
            '& .MuiPagination-ul': {
              flexWrap: 'nowrap',
            },
            '& .MuiDataGrid-columnHeader:focus-within': {
              outline: 'none',
            },
            '& .MuiDataGrid-cell:focus-within': {
              outline: 'none',
            },
            '& .MuiDataGrid-virtualScroller': {
              overflowY: 'auto !important',
              overflowX: 'hidden',
            },
            '& .MuiDataGrid-columnHeader--moving': {
              backgroundColor: 'white',
            },
            '& .MuiDataGrid-row.Mui-selected:hover': {
              backgroundColor: 'white',
            },
            '& .MuiDataGrid-row:hover': {
              backgroundColor: 'white',
            },
            '& .MuiDataGrid-row.Mui-selected': {
              backgroundColor: 'white',
            },
            '& .MuiDataGrid-columnHeaders': {
              borderBottom: 'solid 2px rgb(196, 181, 253)',
              color: 'rgb(109, 40, 217)',
            },
          },
        },
      },
    },
  },
  ptBR,
);
