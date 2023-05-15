const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");

router.post("", async (request, response) => {
  const { name, username, password } = request.body;

  const userExists = await User.findOne({ username });
  if (userExists) {
    return response
      .status(400)
      .json({ error: "Username already exists" })
      .end();
  }
  if (!password) {
    return response
      .status(400)
      .json({ error: "Password field cannnot be empty" })
      .end();
  }

  if (password.length < 4) {
    return response
      .status(400)
      .json({ error: "Password must be longer than 3 characters" })
      .end();
  }

  const salt = bcrypt.genSaltSync(10);
  const passwordHash = bcrypt.hashSync(password, salt);
  const newUser = new User({ name, username, passwordHash });
  await newUser.save();
  return response.status(201).json({ data: newUser }).end();
});

module.exports = router;
