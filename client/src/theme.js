import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        mode: 'light', // Can create a toggle later
        primary: {
            main: '#007AFF', // Mac Blue
        },
        secondary: {
            main: '#5856D6',
        },
        background: {
            default: 'transparent',
            paper: 'rgba(255, 255, 255, 0.7)',
        },
        text: {
            primary: '#1d1d1f',
        },
    },
    typography: {
        fontFamily: [
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(','),
        h5: {
            fontWeight: 600,
        },
        h4: {
            fontWeight: 700,
            letterSpacing: '-0.02em',
        },
        h6: {
            fontWeight: 500,
        }
    },
    shape: {
        borderRadius: 16,
    },
    components: {
        MuiPaper: {
            styleOverrides: {
                root: {
                    backdropFilter: 'blur(20px)',
                    backgroundColor: 'rgba(255, 255, 255, 0.65)',
                    border: '1px solid rgba(255, 255, 255, 0.3)',
                    boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.15)',
                    borderRadius: '16px',
                },
            },
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    textTransform: 'none',
                    borderRadius: '12px',
                    fontWeight: 600,
                    boxShadow: 'none',
                    '&:hover': {
                        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                    },
                },
                containedPrimary: {
                    background: 'linear-gradient(135deg, #007AFF 0%, #00C6FF 100%)',
                }
            },
        },
        MuiAppBar: {
            styleOverrides: {
                root: {
                    background: 'rgba(255, 255, 255, 0.4)',
                    backdropFilter: 'blur(20px)',
                    boxShadow: '0 1px 0 rgba(0,0,0,0.05)',
                    color: '#1d1d1f',
                },
            },
        },
        MuiTextField: {
            styleOverrides: {
                root: {
                    '& .MuiOutlinedInput-root': {
                        borderRadius: '12px',
                        backgroundColor: 'rgba(255,255,255,0.4)',
                        transition: 'all 0.2s ease-in-out',
                        '&:hover': {
                            backgroundColor: 'rgba(255,255,255,0.6)',
                        },
                        '&.Mui-focused': {
                            backgroundColor: 'rgba(255,255,255,0.8)',
                            boxShadow: '0 0 0 4px rgba(0,122,255,0.1)'
                        }
                    }
                }
            }
        },
        MuiDialog: {
            styleOverrides: {
                paper: {
                    background: 'rgba(255, 255, 255, 0.85)',
                }
            }
        }
    },
});

export default theme;
