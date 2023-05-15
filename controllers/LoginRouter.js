const router = require("express").Router();
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

router.post("", async (request, response) => {
  const { username, password } = request.body;
  if (!username || !password) {
    return response.status(400).json({ error: "Field cannot be empty " }).end();
  }
  const userExists = await User.findOne({ username });

  const passwordCorrect = userExists
    ? await bcrypt.compare(password, userExists.passwordHash)
    : null;

  if (!(userExists && passwordCorrect)) {
    return response
      .status(404)
      .json({ error: "Invalid username / password" })
      .end();
  }

  const payload = {
    id: userExists.id,
  };
  const token = jwt.sign(payload, process.env.SECRET);

  return response.status(200).json({ token }).end();
});

module.exports = router;
