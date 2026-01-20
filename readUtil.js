import { moviesCollection } from "./mymongo.js"


const getMovies = (res) => {
    moviesCollection.find({}, {limit: 10}).toArray()
        .then(resp => {
            if (!resp)
                resp = { "error": "No Movies Found" }
            res.status(200).json(resp)

        })
}

export { getMovies }