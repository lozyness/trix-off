import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Wand from '@mui/icons-material/AutoFixHigh';
import CssBaseline from '@mui/material/CssBaseline';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Tricks from "./Tricks";

const theme = createTheme();

export default function Album() {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <AppBar position="relative">
                <Toolbar>
                    <Wand sx={{ mr: 2 }} />
                    <Typography variant="h6" color="inherit" noWrap>
                        Trix Off
                    </Typography>
                </Toolbar>
            </AppBar>
            <main>
                {/* Hero unit */}
                <Box
                    sx={{
                        bgcolor: 'background.paper',
                        pt: 8,
                        pb: 6,
                    }}
                >
                    <Container maxWidth="sm">
                        <Typography
                            component="h1"
                            variant="h2"
                            align="center"
                            color="text.primary"
                            gutterBottom
                        >
                            Trix Off
                        </Typography>
                        <Typography variant="h5" align="center" color="text.secondary" paragraph>
                            One Week.
                            One Trick.
                        </Typography>
                        <Typography variant="h5" align="center" color="text.secondary" paragraph>
                            Lets Go!
                        </Typography>
                        <Stack
                            sx={{ pt: 4 }}
                            direction="row"
                            spacing={2}
                            justifyContent="center"
                        >
                            <Button variant="contained">Select New Trick</Button>
                            <Button variant="outlined">Manage Tricks</Button>
                        </Stack>
                    </Container>
                </Box>
                <Tricks />
            </main>
            {/* End footer */}
        </ThemeProvider>
    );
}