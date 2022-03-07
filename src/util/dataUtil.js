import faunadb, {query} from "faunadb";

const client = new faunadb.Client({
    secret: 'fnAEg3KFzfAAwaCxuo_V9OZ3IAFE4Lsb8xgT-Hx4',
    domain: "db.eu.fauna.com"
});

const dataUtil = {
    deleteData: () => {
        client.query(
            query.Paginate(
                query.Documents(
                    query.Collection(
                        'tricks'
                    )
                )
            )
        ).then(res => {
            const tricksRef = res.data;
            const deleteQuery = tricksRef.map(ref => query.Delete(ref));
            return client.query(deleteQuery)
                .then((res) => {
                    console.log("deleted " + res)
                })
        })
    },
    allTricks: () => {
        return client.query(
            query.Paginate(
                query.Index(
                    'all_tricks',
                )
            )
        ).then(res => {
            const tricksRef = res.data;
            const tricks = tricksRef.map(ref => query.Get(ref));
            return client.query(tricks)
        })
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
            .then((ret) => {
                console.log(ret);
                return ret.data
            })
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
        ).then((ret) => ret.data)
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
        ).then(res => res.data)
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
        ).then(res => {
            const lvlRefs = res.data;
            const levels = lvlRefs.map(ref => query.Get(ref));
            return client.query(levels)
                .then((res) => res.map(({data}) => data.name))
        })
    },
    loadSelectedTrick: () => {
        return client.query(
            query.Paginate(
                query.Match(
                    query.Index(
                        'selected_sort_by_date_desc'
                    )
                ), {size: 1}
            )
        ).then(ret => {
            return ret.data[0]
        })
    },
    saveSelectedTrick: (trickName) => {
        const data = {
            name: trickName,
            selectedDate: query.ToDate(query.Now())
        }
        return client.query(
            query.Create(
                query.Collection('selectedTricks'),
                { data: data },
            )
        )
    },
    deleteSelected: (selected) => {
        console.log("Delete: " + selected)
        return client.query(
            query.Delete(selected)
        )
    }
}

export default dataUtil;