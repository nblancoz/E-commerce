const express = require("express");
const app = express();
const PORT = 8080;

app.use(express.json());

app.use("/users", require("./routes/users.js"));
app.use("/orders", require("./routes/orders.js"));
app.use("/products", require("./routes/products.js"))

app.listen(PORT, () => {
  console.log(`Server started on port: ${PORT}`);
});