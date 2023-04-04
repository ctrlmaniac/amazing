const express = require("express");
const bodyParser = require("body-parser");

const authRouter = require("./routes/auth");
const userRouter = require("./routes/user");
const productsRouter = require("./routes/product");
const storeRouter = require("./routes/store");

const app = express(express.json());
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/products", productsRouter);
app.use("/api/store", storeRouter);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
