import * as React from 'react';
import {useEffect, useState} from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import ManageTricks from "./ManageTricks";
import {Divider} from "@mui/material";
import Nav from "./Nav";
import dataUtil from "./util/dataUtil";
import Loading from "./Loading";
import Chip from "@mui/material/Chip";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

const theme = createTheme();

const App = () => {

    const [selectedTrick, setSelectedTrick] = useState(null);
    const [tricks, setTricks] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [selecting, setSelecting] = useState(false);
    const [manage, setManage] = useState(false);
    const [saved, setSaved] = useState(null);
    const [newTrick, setNewTrick] = useState(false);


    useEffect(() => {
        let selectingTimer;
        if (selecting) {
            selectingTimer = setTimeout(() => {
                setSelecting(false);
            }, 3000);
        }
        return () => {
            clearTimeout(selectingTimer);
        }
    }, [selecting])

    const selectNextTrick = () => {
        setSelectedTrick(() => tricks[Math.floor(Math.random() * tricks.length)])
    }

    useEffect(() => {
        let selectNextTimer;
        if (selecting) {
            selectNextTimer = setTimeout(() => {
                selectNextTrick();
            }, 150);
        }
        return () => {
            clearTimeout(selectNextTimer);
        }
    }, [selectedTrick, selecting])

    const displaySelected = () => {
        dataUtil.loadSelectedTrick().then((data) => {
            if(data) {
                setSaved((data))
                const name = data[1];
                dataUtil.trickByName(name).then(trick => setSelectedTrick(trick));
                setNewTrick(false)
            } else {
                setSelectedTrick(null)
            }
        })
    }

    useEffect(() => {
        console.log("Running data loader");
        setLoading(true);
        dataUtil.levels()
            .then((difficulties) => {
                console.log("Retrieved levels");
                difficulties.forEach((difficulty) => {
                    dataUtil.tricksByDifficulty(difficulty)
                        .then((newTricks) => {
                            console.log("Retrieved tricks for level: " + difficulty);
                            const converted = newTricks.map((trick) => (
                                {name: trick, level: difficulty}
                            ))
                            setTricks((tricks) => [...tricks, ...converted]);
                        }).catch((err) => {
                            setError(err.name + ": " + err.message);
                    })
                })
            })
            .then(() => {
                displaySelected()
            })
            .catch((err) => {
                setError(err.name + ": " + err.message);
            })
            .finally(() => {
                setLoading(false);
            })
    }, [])

    const handleSelecting = () => {
        setSelecting(true);
        selectNextTrick();
        setNewTrick(true);
    }

    const toggleManage = () => {
        setManage((manage) => !manage)
    }

    const saveTrick = () => {
        dataUtil.deleteSelected(saved[2])
        dataUtil.saveSelectedTrick(selectedTrick.name)
            .then((ret) => {
                setSaved(ret.data);
                displaySelected();
            })
        .catch((err) => console.error("error saving selected trick"))
    }

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            <Nav/>
            <div>
                {/* Hero unit */}
                <Box
                    sx={{
                        bgcolor: 'background.paper',
                        pt: 8,
                        pb: 3,
                    }}
                >
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

                <Divider/>
                <Stack
                    sx={{pt: 4, pb: 4}}
                    direction="column"
                    spacing={1}
                    justifyContent="center">

                    {selectedTrick ?
                        (<Stack direction="row" justifyContent="center" spacing={1}>
                            <Typography variant="h5" align="center" color="text.secondary" paragraph>
                                {selectedTrick.name}
                            </Typography>
                            {!selecting && newTrick && <Chip variant="outlined" label="x" onClick={displaySelected}></Chip>}
                        </Stack>) :
                        (<Typography variant="h5" align="center" color="text.secondary" paragraph>
                            Click Select New Trick
                        </Typography>)
                    }
                    <Stack direction="row" spacing={2} justifyContent="center">

                        <Button variant="contained" disabled={loading || selecting} onClick={handleSelecting}>Select
                            New Trick</Button>
                        <Button variant="contained" align="center" disabled={!selectedTrick || selecting || !newTrick}
                                onClick={saveTrick}>Save Next Trick</Button>
                    </Stack>
                </Stack>
                <Divider/>
                <Container>
                    <Button sx={{mt:2}} variant="text"
                            onClick={toggleManage}>{manage ? "Hide Tricks List" : "View Tricks List"}</Button>
                    {loading ? <Loading theme/> : manage && <ManageTricks tricks={tricks}/>}
                </Container>

            </div>
            <Snackbar open={error} autoHideDuration={6000} onClose={() => setError(null)}>
                <Alert onClose={() => setError(null)} severity="error" sx={{ width: '100%' }}>
                    {error}
                </Alert>
            </Snackbar>
            {/* End footer */}
        </ThemeProvider>
    );
}
export default App;