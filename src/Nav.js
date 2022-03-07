import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Wand from '@mui/icons-material/AutoFixHigh';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';


const Nav = () => {
    return (
        <AppBar position="relative">
            <Toolbar>
                <Wand sx={{mr: 2}}/>
                <Typography variant="h6" color="inherit" noWrap>
                    Trix Off
                </Typography>
            </Toolbar>
        </AppBar>
    );
}
export default Nav;