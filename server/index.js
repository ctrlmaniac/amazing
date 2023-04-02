const express = require("express");

const userRouter = require("./routes/users");

const app = express(express.json());
const port = process.env.PORT || 3000;

app.use("/api", userRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
