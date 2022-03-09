import * as React from 'react';
import {useEffect, useState} from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import ManageTricks from "./ManageTricks";
import {Divider} from "@mui/material";
import Nav from "./Nav";
import dataUtil from "./util/dataUtil";
import Loading from "./Loading";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import Header from "./Header";
import TrickSelector from "./TrickSelector";

const theme = createTheme();

const App = () => {

    const [tricks, setTricks] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [manage, setManage] = useState(false);

    const getTrick = (index) => {
        let trick = null;
        if (index < tricks.length) {
            trick = tricks[index]
        }
        return trick;
    }

    useEffect(() => {
        setLoading(true);
        dataUtil.allTricks()
            .then((tricks) => {
                setTricks(tricks.map((trick) => {
                    return {name: trick.data.name, level: trick.data.difficulty, ref: trick.ref}
                }));
            })
            .catch((err) => {
                setError(err.name + ": " + err.message);
            })
            .finally(() => {
                setLoading(false);
            })
    }, [])

    const toggleManage = () => {
        setManage((manage) => !manage)
    }

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            <Nav/>
            <Header/>
            <Divider/>
            <TrickSelector
                handleError={(error) => setError(error)}
                getTrick={getTrick}
                numTricks={tricks ? tricks.length : 0}/>
            <Divider/>
            <Container>
                <Button sx={{mt: 2}}
                        ariant="text"
                        onClick={toggleManage}>
                    {manage ? "Hide Tricks List" : "View Tricks List"}
                </Button>
                {loading ? <Loading theme/> : manage && <ManageTricks tricks={tricks}/>}
            </Container>
            <Snackbar open={error} autoHideDuration={6000} onClose={() => setError(null)}>
                <Alert onClose={() => setError(null)} severity="error" sx={{width: '100%'}}>
                    {error}
                </Alert>
            </Snackbar>
        </ThemeProvider>
    );
}
export default App;