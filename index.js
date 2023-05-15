const config = require("./utils/config");
const express = require("express");
const app = express();
const cors = require("cors");
const userRouter = require("./controllers/UserRouter");

app.use(cors());
app.use(express.json());

require("./db");

app.get("/api", (request, response) =>
  response.send("Welcome to User Authentication API")
);
app.use("/api/users", userRouter)

const PORT = config.PORT;
app.listen(PORT, () => console.log(`app running on port ${PORT}`));
