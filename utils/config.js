require("dotenv").config();

const MONGODB_URI = process.env.DB;
const PORT = 3001;

module.exports = {
	MONGODB_URI, PORT
}