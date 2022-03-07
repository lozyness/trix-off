import * as React from 'react';
import {useEffect, useState} from 'react';
import faunadb, {query} from "faunadb"
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";

import trickData from './tricks.json';
import data from "./util/dataUtil";
import dataUtil from "./util/dataUtil";

// const adminClient = new faunadb.Client({ secret: 'fnAEgzbzegAAxuDTOs9YaVxcAZmMynqIOLkVw73X' });
const serverClient = new faunadb.Client({
    secret: 'fnAEg3KFzfAAwaCxuo_V9OZ3IAFE4Lsb8xgT-Hx4',
    domain: "db.eu.fauna.com"
});

const initialiseData = () => {
    serverClient.query(
        query.Map(
            trickData.tricks,
            query.Lambda(
                'trick',
                query.Create(
                    query.Collection('tricks'),
                    {data: query.Var('trick')}
                )
            )
        )
    ).then((ret) => console.log(ret))
    .catch((err) => console.error(
        'Error: [%s] %s: %s',
        err.name,
        err.message,
        err.errors()[0].description,
    ))
}

const Tricks = () => {

    const [selectedTrick, setSelectedTrick] = useState(null)
    const [tricks, setTricks] = useState(null)
    const [error, setError] = useState(null)

    const setTricksByDifficulty = (difficulty, tricks) => {
        console.log(difficulty)
        console.log(tricks)
    }

    useEffect(() => {
        dataUtil.levels()
            .then((difficulties) => {
                difficulties.map((difficulty) => {
                    dataUtil.tricksByDifficulty(difficulty)
                    .then((tricks) => {
                        setTricksByDifficulty(difficulty, tricks)
                    }).catch((err) => {
                        setError(err.name + ": " + err.message)
                    })
                })
            })
        // data.allTricks()
        // .then((data) => {
        //     console.log(data)
        //     setSelectedTrick(data)
        // })
        // .catch((err) => {
        //     setError(err.name + ": " + err.message)
        // })
    }, [])


    return (
        <div>
            {selectedTrick ? <span> {selectedTrick.name}</span> : null}
            <Snackbar open={error !== null} autoHideDuration={6000} onClose={() => setError(null)}>
                <Alert onClose={() => setError(null)} severity="error" sx={{width: '100%'}}>
                    {error}
                </Alert>
            </Snackbar>
        </div>
    )
}

export default Tricks;