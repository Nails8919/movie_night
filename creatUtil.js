import { ObjectId } from "mongodb"
import { favoritesCollection, moviesCollection } from "./mymongo.js"

// Add a movie to the favorites collection
const addToFavorites = (res, id) => {
    favoritesCollection
        .countDocuments(
            { showID: id })
        .then(countresults => {
            if (!countresults) {
                favoritesCollection.insertOne({ showID: id })
                    .then(result => {
                        if (result.insertedId)
                            res.status(200).json({ "msg": "Show added to favorites" })
                        else
                            res.status(500).json({ "error": "Failed to add show to favorites" })
                    })
            }
            else
                res.status(200).json({ "error": "Show already in favorites" })
        })

}

export { addToFavorites }