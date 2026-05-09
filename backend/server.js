const express = require("express");
const cors = require("cors");
const { errorHandler } = require("./middlewares/errorHandler");

const app = express();

app.use(cors());
app.use(express.json());

const routes = require("./routes");

app.use("/api", routes);

app.use(errorHandler);

app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000");
});
