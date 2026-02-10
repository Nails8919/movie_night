import { favoritesCollection } from "./mymongo.js"

// Add a movie to the favorites collection
const addToFavorites = (id) => {
    favoritesCollection.insertOne({ showID: id })
        .then(result => {
            if (result.insertedId)
                res.status(200).json({ "msg": "Show added to favorites" })
            else
                res.status(500).json({ "error": "Failed to add show to favorites" })
        })
}

export { addToFavorites }