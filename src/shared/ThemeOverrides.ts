import { createTheme } from '@mui/material/styles';
import type {} from '@mui/x-data-grid/themeAugmentation'; 

const muiThemeOverrides = createTheme({
  components: {
    MuiButton: {
    defaultProps: {
        disableElevation: true,
        disableRipple: true,
      },
      styleOverrides: {
        root: {
          textTransform: 'none',
        },
      },
    },
    MuiDataGrid: {
      defaultProps: {
        // Option A: Forces compact density rigidly
        density: 'compact', 
        disableColumnFilter: true,
        disableColumnMenu: true,
      },
    },
  },
});

export default muiThemeOverrides;