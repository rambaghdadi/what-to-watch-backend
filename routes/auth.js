import express from "express"
import bcrypt from "bcryptjs"
import User from "../models/user.js"
import jwt from "jsonwebtoken"

//TODO add validation
const router = express.Router()

router.post("/signup", async (req, res) => {
	try {
		const password = req.body.password
		const hashedPassword = await bcrypt.hash(password, 12)
		const user = new User({
			name: req.body.name,
			email: req.body.email,
			password: hashedPassword,
		})
		const result = await user.save()
		res.status(201).json({ message: "User Created", userId: result._id })
	} catch (error) {
		res.status(500).json({ message: error.toString() })
	}
})

router.post("/signin", async (req, res) => {
	try {
		const email = req.body.email
		const password = req.body.password
		const user = await User.findOne({ email: email })
		if (!user) throw new Error("User doesn't exist. Please sign up instead.")
		const passwordEncryption = await bcrypt.compare(password, user.password)
		if (!passwordEncryption) throw new Error("Wrong password entered.")
		const token = jwt.sign(
			{ email: user.email, userId: user._id.toString() },
			process.env.JWTSECRET,
			{ expiresIn: "24h" }
		)
		res.status(200).json({ token: token, userId: user._id.toString() })
	} catch (error) {
		res.status(401).json({ message: error.toString() })
	}
})

export default router
