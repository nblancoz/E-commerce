const express = require("express");
const { typeError } = require("./middleware/errors.js");
const app = express();
const PORT = 8080;
const cors = require("cors")

app.use(express.json());
app.use(cors())

app.use("/users", require("./routes/users.js"));
app.use("/orders", require("./routes/orders.js"));
app.use("/products", require("./routes/products.js"));
app.use("/categories", require("./routes/categories.js"));

app.use(typeError);

app.listen(PORT, () => {
  console.log(`Server started on port: ${PORT}`);
});