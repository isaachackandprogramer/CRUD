import express, { json } from 'express'
import router from "./routes/routes.js";
const app = express()

app.use(express.json())
app.use(router)

app.get("/", (req, res) => {
    res.send("oi")
})

app.listen(3000, () => {
    console.log("server is running")
})
