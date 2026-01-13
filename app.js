import express from 'express'
import { PORT } from './config.js'


const app = express()

app.get('/', (req, res) => {
  res.send('Hello World Sky <a href="/show">Show Page</a>')
})

app.get("/show",(req,res)=>{
  res.send({"msg":"This is my show page"})
}) 

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})