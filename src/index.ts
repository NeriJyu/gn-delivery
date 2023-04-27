import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import router from "./api/routes/index.routes";
import bodyParser from "body-parser";

dotenv.config();
class App {
  public app!: express.Application;
  public PORT = process.env.PORT || 3000;
  public sequelize = require("./config/database");

  constructor() {
    this.app = express();
    this.config();
  }

  private async config() {
    this.app.use(cors());

    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: true }));

    this.app.listen(this.PORT);
    this.app.use(router);

    this.sequelize
      .sync()
      .then(() => console.log("database connected successfully"));

    console.log(`🚀 listening on port: ${this.PORT}`);
  }
}

export default new App().app;
