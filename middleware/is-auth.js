import jwt from "jsonwebtoken"

export default function token(req, res, next) {
	let errorStatus = 500
	let decodedToken
	try {
		const authHeader = req.get("Authorization")
		if (!authHeader) {
			errorStatus = 401
			throw new Error("Not Authenticated")
		}
		const token = authHeader.split(" ")[1]
		decodedToken = jwt.verify(token, process.env.JWTSECRET)
		if (!decodedToken) {
			errorStatus = 401
			throw new Error("Not authenticated.")
		}
		req.userId = decodedToken.userId
		next()
	} catch (error) {
		res.status(errorStatus).json({ message: error.toString() })
	}
}
