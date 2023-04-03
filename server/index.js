const express = require("express");
const bodyParser = require("body-parser");

const authRouter = require("./routes/auth");
const userRouter = require("./routes/user");
const productsRouter = require("./routes/product");

const app = express(express.json());
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);
app.use("/api/products", productsRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
