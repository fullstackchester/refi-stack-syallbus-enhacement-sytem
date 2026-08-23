import { createTheme } from '@mui/material/styles';

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
  },
});

export default muiThemeOverrides;