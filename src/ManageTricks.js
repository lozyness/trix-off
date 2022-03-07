import * as React from 'react';
import List from "@mui/material/List";
import Trick from "./Trick";

const ManageTricks = ({tricks}) => {

    return (
        <List
            sx={{width: '100%', maxWidth: 360, bgcolor: 'background.paper'}}
            aria-label="contacts"
        >
            {tricks.map((trick) => <Trick key={trick.name} trickName={trick.name} level={trick.level}
                                             selected={false}/>)}
        </List>
    );
}

export default ManageTricks;