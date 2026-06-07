import { ObjectId } from "mongodb"
import { favoritesCollection, moviesCollection } from "./mymongo.js"

// Add a movie to the favorites collection
const addToFavorites = (res, id) => {
    favoritesCollection
        .countDocuments(
            { showID: id })
        .then(countresults => {
            if (!countresults) {
                favoritesCollection.insertOne({
                    showID: new ObjectId(id),
                    note: "",
                    watched: false
                })
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


const deleteFavorite = (res, id) => {
    favoritesCollection
        .deleteOne({ _id: new ObjectId(id) })
        .then(result => {
            if (result.deletedCount > 0) {
                res.status(200).json({ msg: "Deleted successfully" })
            } else {
                res.status(404).json({ error: "Not found" })
            }
        })
}

const updateFavorite = (res, id, data) => {
    favoritesCollection
        .updateOne(
            { _id: new ObjectId(id) },
            {
                $set: {
                    note: data.note,
                    watched: data.watched
                }
            }
        )
        .then(result => {
            if (result.modifiedCount > 0)
                res.status(200).json({ msg: "Favorite updated" })
            else
                res.status(404).json({ error: "Favorite not found" })
        })
}

export { addToFavorites, deleteFavorite, updateFavorite }