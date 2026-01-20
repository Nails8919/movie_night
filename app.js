import express from 'express'
import { PORT } from './config.js'
import { getMovies } from './readUtil.js'


const app = express()

app.get('/', (req, res) => {
  res.send('Hello World Sky <a href="/show">Show Page</a>')
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

app.get("/movies", (req, res) => {
  getMovies(res)
})