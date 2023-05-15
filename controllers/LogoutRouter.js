const router = require("express").Router();
const User = require("../models/User");

router.post("", async (request, response) => {
	const {username} = request.body
  const userExists = await User.findOne({ username });
  
  if (!userExists) {
    return response
      .status(404)
      .json({ error: "Invalid username" })
      .end();
  }

  //Clear key on logout
  userExists.key = "";
  await userExists.save();

  return response.status(200).json({ message: "Logout Successfully!" }).end();
});

module.exports = router;
