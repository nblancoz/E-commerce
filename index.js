const express = require("express");
const app = express();
const PORT = 8080;

app.use(express.json());

app.use("/users", require("./routes/users"));
app.use("/orders", require("./routes/orders"));

app.listen(PORT, () => {
  console.log(`Server started on port: ${PORT}`);
});