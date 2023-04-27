import router from "./api/routes/index.routes";
import app from "./index";

class Server {
  private app = app;

  constructor() {
    this.init();
  }

  init() {
    this.app.use(router);
  }
}

new Server();
