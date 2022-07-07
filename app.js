import express from "express"
import mongoose from "mongoose"
import "dotenv/config"
import helmet from "helmet"

import watchlistRoutes from "./routes/watchlist.js"
import authRoutes from "./routes/auth.js"

const app = express()

app.use(express.json())
app.use((req, res, next) => {
	res.setHeader("Access-Control-Allow-Origin", "*")
	res.setHeader(
		"Access-Control-Allow-Methods",
		"GET, POST, PUT, PATCH, DELETE, HEAD, OPTIONS"
	)
	res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization")
	next()
})

app.use(helmet())
app.use("/api", watchlistRoutes)
app.use("/api", authRoutes)

mongoose
	.connect(
		`mongodb+srv://${process.env.DBUSER}:${process.env.DBPASS}@cluster0.1cnte.mongodb.net/${process.env.DBNAME}?retryWrites=true&w=majority`
	)
	.then(() => {
		app.listen(process.env.PORT || 4000)
	})
	.catch((err) => {
		console.log(err)
	})
