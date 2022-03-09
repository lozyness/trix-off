import * as React from 'react';
import {useEffect, useState} from 'react';
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import Button from "@mui/material/Button";
import dataUtil from "./util/dataUtil";
import Loading from "./Loading";

const SelectedTrick = ({selected, isDirty, handleReset}) => {

    if(selected) {
        return (
            <Stack direction="row" justifyContent="center" spacing={1}>
                <Typography variant="h5" align="center" color="text.secondary" paragraph>
                    {selected.name}
                </Typography>
                {isDirty && <Chip variant="outlined" label="reset" onClick={handleReset} size={"small"}/>}
            </Stack>
        )
    } else {
        return (
            <Typography variant="h5" align="center" color="text.secondary" paragraph>
                Click Select New Trick
            </Typography>
        )
    }
}

const TrickSelector = ({numTricks, getTrick, handleError}) => {

    const [savedTrick, setSavedTrick] = useState(null);
    const [selectedTrick, setSelectedTrick] = useState(null);
    const [isSelecting, setIsSelecting] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isDirty, setIsDirty] = useState(false);

    useEffect((handleError) => {
        setIsLoading(true);
        dataUtil.loadSelectedTrick()
            .then((trick) => {
                if (trick) {
                    setSavedTrick(trick)
                }
            })
            .catch((err) => handleError(err))
            .finally(() => setIsLoading(false))
    }, []);

    const handleSelecting = () => {
        setIsDirty(true);
        setIsSelecting(true);
        setSelectedTrick(getTrick(Math.floor(Math.random() * numTricks)));
        setIsSelecting(false);
    }

    const resetSelection = () => {
        setSelectedTrick(savedTrick);
        setIsDirty(false);
    }

    const saveSelected = () => {
        if (savedTrick) {
            dataUtil.deleteSelected(savedTrick.ref).catch(() => handleError("error deleting last trick"));
        }
        dataUtil.saveSelectedTrick(selectedTrick.name)
            .then((trick) => {
                setSavedTrick(trick);
            })
            .catch((err) => handleError("error saving selected trick"))
            .finally(() => setIsDirty(false));
    }

    const currentTrick = () => {
        return selectedTrick ? selectedTrick : savedTrick ? savedTrick : null;
    }

    return (
        <Stack
            sx={{pt: 4, pb: 4}}
            direction="column"
            spacing={1}
            justifyContent="center">
            {isLoading ? <Loading/> : <SelectedTrick selected={currentTrick()} isDirty={isDirty} handleReset={resetSelection} />}
            <Stack direction="row" spacing={2} justifyContent="center">
                <Button
                    variant="contained"
                    disabled={(isLoading || isSelecting) && numTricks > 0 }
                    onClick={handleSelecting}>
                    Select New Trick
                </Button>
                <Button variant="contained"
                        align="center"
                        disabled={!isDirty || !selectedTrick}
                        onClick={saveSelected}>
                    Save Next Trick
                </Button>
            </Stack>
        </Stack>
    );
}

export default TrickSelector;