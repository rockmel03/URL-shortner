import { config } from "dotenv";
config({ path: "src/.env" });

import http from "http";
import app from "./app.js";
import connectDB from "./db/index.js";

const port = process.env.PORT || 3000;
const server = http.createServer(app);

connectDB()
  .then(() => {
    server.listen(port, () => {
      console.log(`Server is listning on port : ${port}`);
    });
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
