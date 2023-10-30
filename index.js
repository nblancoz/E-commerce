const express = require("express");
const app = express();
const PORT = 8080;

app.use(express.json());

app.use("/clients", require("./routes/clients"));

app.listen(PORT, () => {
  console.log(`Server started on port: ${PORT}`);
});