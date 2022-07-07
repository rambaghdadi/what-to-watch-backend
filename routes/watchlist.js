import express from "express"
import { Watchlist } from "../models/watchlist.js"
import isAuth from "../middleware/is-auth.js"

const router = express.Router()

router.get("/watchlist", isAuth, async (req, res) => {
	try {
		const watchlist = await Watchlist.find({ user: req.userId })
		res.status(200).json({ message: "Fetched succesfully", items: watchlist })
	} catch (error) {
		res.status(500).json({ message: error.toString() })
	}
})

router.post("/watchlist/", isAuth, async (req, res) => {
	let watchlist
	try {
		watchlist = new Watchlist({
			imageUrl: req.body.imageUrl,
			title: req.body.title,
			year: req.body.year,
			rating: req.body.rating,
			streamingInfo: req.body.streamingInfo,
			director: req.body.director,
			cast: req.body.cast,
			overview: req.body.overview,
			runtime: req.body.runtime,
			age: req.body.age,
			genres: req.body.genres,
			link: req.body.link,
			user: req.userId,
		})
		const result = await watchlist.save()
		res.status(201).json({ message: "Item added successfully", item: result })
	} catch (error) {
		res.status(422).json({ message: error.toString(), item: watchlist })
	}
})

router.delete("/watchlist/:id", isAuth, async (req, res) => {
	try {
		const id = req.params.id
		const itemToDelete = await Watchlist.findByIdAndRemove(id)
		res.status(200).json({ message: "Item deleted." })
	} catch (error) {
		res.status(422).json({ message: error.toString() })
	}
})

export default router
