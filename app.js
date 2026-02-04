import express from 'express'
import { PORT } from './config.js'
import { getMovie, getMovies } from './readUtil.js'


const app = express()

app.get('/', (req, res) => {
  res.send('Movie Database <a href="/show">Show Page</a>')
})

app.get("/show", (req, res) => {
  res.send({ "msg": "This is my show page" })
})

app.get("/calc/rect/:length/:width", (req, res) => {

  let data = req.params
  res.status(206).send(`The Area of a Rectangle ${data.length} x ${data.width} is ${data.length * data.width}`)
})

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})

app.get("/:type", (req, res) => {
  const pageSize = 10
  let type = req.params.type.toLowerCase()
  if (type != "movie" && type != "series") {
    res.status(400).send({ "error": "Invalid URI" })
    return
  }
  getMovies(res, type)
})

app.get("/:type/p:page", (req, res) => {
  const pageSize = 10
  let type = req.params.type.toLowerCase()
  if (type != "movie" && type != "series") {
    res.status(400).send({ "error": "Invalid URI" })
    return
  }
  let page = req.params.page
  if (isNaN(page) || page < 1) {
    res.status(400).send({ "error": "Invalid Page Number" })
    return
  }
  page = (page - 1) * pageSize
  getMovies(res, type, page)
})

app.get("/info/:id", (req, res) => {
  let movieID = req.params.id
  if (!movieID || movieID.length != 24) {
    res.status(400).send({ "error": "Invalid Movie ID" })
    return
  }
  getMovie(res, movieID)
})