import * as React from 'react';
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

const Loading = ({theme}) => {

    return (
        <Backdrop open={true} sx={{ color: '#fff'}}
        >
            <CircularProgress color="inherit" />
        </Backdrop>
    );
}

export default Loading;