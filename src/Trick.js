import * as React from 'react';
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ArrowIcon from "@mui/icons-material/ArrowRight";
import Chip from "@mui/material/Chip";

const Trick = ({trickName, level, selected}) => {

    return (
        <ListItem>
            {selected && (
                <ListItemIcon>
                    <ArrowIcon/>
                </ListItemIcon>
            )}
            <ListItemText primary={trickName} secondary={(<Chip label={level} size="small" variant="outlined" />)}/>
        </ListItem>
    );
}

export default Trick;