import faunadb, {query} from "faunadb";
import trickData from "../tricks.json";

const client = new faunadb.Client({
    secret: 'fnAEg3KFzfAAwaCxuo_V9OZ3IAFE4Lsb8xgT-Hx4',
    domain: "db.eu.fauna.com"
});

export default {
    initialiseData: () => {
        client.query(
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
        )
            .then((ret) => console.log(ret))
            .catch((err) => console.error(
                'Error: [%s] %s: %s',
                err.name,
                err.message,
                err.errors()[0].description,
            ))
    },
    allTricks: () => {
        return client.query(
            query.Paginate(
                query.Match(
                    query.Index(
                        'tricks_by_difficulty',
                    ),
                    "Beginner"
                )
            )
        )
            .then((ret) => ret.data)
            .catch((err) => console.error(
                'Error: [%s] %s: %s',
                err.name,
                err.message,
                err.errors()[0].description,
            ))
    },
    trickByRef: (ref) => {
        return client.query(
            query.Get(
                query.Ref(
                    query.Collection('tricks'), ref
                )
            )
        )
            .then((ret) => ret.data)
            .catch((err) => console.error(
                'Error: [%s] %s: %s',
                err.name,
                err.message,
                err.errors()[0].description,
            ))
    },
    trickByName: (name) => {
        return client.query(
            query.Get(
                query.Match(
                    query.Index(
                        'trick_by_name',
                    ),
                    name
                )
            )
        )
            .then((ret) => ret.data)
            .catch((err) => console.error(
                'Error: [%s] %s: %s',
                err.name,
                err.message,
                err.errors()[0].description,
            ))
    },
    tricksByDifficulty: (difficulty) => {
        return client.query(
            query.Paginate(
                query.Match(
                    query.Index(
                        'tricks_by_difficulty',
                    ),
                    difficulty
                )
            )
        )
            .then((ret) => ret.data)
            .catch((err) => console.error(
                'Error: [%s] %s: %s',
                err.name,
                err.message,
                err.errors()[0].description,
            ))
    },
    levels: () => {
        return client.query(
            query.Paginate(
                query.Documents(
                    query.Collection(
                        'difficulties'
                    )
                )
            )
        )
    }
}