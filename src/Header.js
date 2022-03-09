import React from 'react';
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

const Header = () => {
    return (

        <Box sx={{
                bgcolor: 'background.paper',
                pt: 8,
                pb: 3,
            }}>
            <Container maxWidth="sm">
                <Typography
                    component="h1"
                    variant="h2"
                    align="center"
                    color="text.primary"
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
            </Container>
        </Box>
    );
};

export default Header;