import mongoose from "mongoose"

const Schema = mongoose.Schema
const watchlistSchema = new Schema(
	{
		imageUrl: {
			type: String,
		},
		title: {
			type: String,
		},
		year: {
			type: String,
		},
		rating: {
			type: String,
		},
		streamingInfo: {
			type: Array,
		},
		director: {
			type: String,
		},
		cast: {
			type: String,
		},
		overview: {
			type: String,
		},
		runtime: {
			type: String,
		},
		age: {
			type: String,
		},
		genres: {
			type: String,
		},
		link: {
			type: String,
		},
		user: {
			type: Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
	},
	{ timestamps: true }
)

export const Watchlist = mongoose.model("Watchlist", watchlistSchema)
