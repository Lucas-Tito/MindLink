import express from "express";

const app = express();
app.use(express.json()); //allows json usage

import routes from "./routes/router.js"

app.use("/mindlink", routes)

app.listen(3000, () => {
  console.log("It was too big to be called a sword");
});
