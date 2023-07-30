import express from "express";
import routes from "./src/routes.js";

const app = express();

app.set("view engine", "ejs");
app.set("views", "./src/views");
app.use("/", routes);

const PORT = 8000;
app.listen(PORT, () => {
  console.log(`Berjalan pada port ${PORT}`);
});
