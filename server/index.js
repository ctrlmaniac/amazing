const express = require("express");
const bodyParser = require("body-parser");

const userRouter = require("./routes/user");
const authRouter = require("./routes/auth");

const app = express(express.json());
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/api", userRouter);
app.use("/api/auth", authRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
