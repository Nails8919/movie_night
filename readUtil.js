import { format } from "date-and-time"
import { favoritesCollection, moviesCollection } from "./mymongo.js"
import { ObjectId } from "mongodb"


const getMovies = (res, type, page = 0) => {
    moviesCollection
        .find({
            type: type
        }, {
            limit: 10,
            skip: page,
            sort: { year: -1 }
        })
        .project({
            plot: 1,
            genres: 1,
            runtime: 1,
            poster: 1,
            title: 1,
            year: 1
        })
        .toArray()
        .then(resp => {
            if (!resp)
                resp = { "error": "No Movies Found" }
            else {
                for (let doc of resp) {
                    if (doc.runtime) {
                        let hours = Math.floor(doc.runtime / 60)
                        let minutes = doc.runtime % 60
                        doc.runtime = `${hours} ${hours == 1 ? "hour" : "hours"} ${minutes} ${minutes == 1 ? "min" : "mins"}`
                    }
                }
            }
            res.status(200).json(resp)
        })
}

//retrieve a single movie by its ID
const getMovie = (res, movieID) => {
    moviesCollection
        .findOne({ _id: new ObjectId(movieID) },
            {
                projection: {
                    fullplot: 1,
                    imdb: {rating: 1},
                    year: 1,
                    genres: 1,
                    title: 1,
                    released: 1,
                    directors: 1,
                    posters: 1
                }
            }
        )
        .then(doc => {
            if (!doc) {
                doc = { "error": "Movie Not Found" }
            }
            if (doc.released) {
                doc.released = format(doc.released, " MMM DD , YYYY")
                console.log(doc)
            }
            res.status(200).json(doc)
        })
}

//retrieve all movies in the favorites collection
const getFavorites = (res) => {
    favoritesCollection
    .find({})
    .toArray()
    .then(favoritesDocs => {
        if (!favoritesDocs)
            favoritesDocs = { "error": "No Favorites Found" }
        res.status(200).json(favoritesDocs)
    })
}

export { getMovies, getMovie, getFavorites }