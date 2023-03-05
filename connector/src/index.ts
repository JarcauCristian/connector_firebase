/* eslint-disable @typescript-eslint/no-explicit-any */
import express, { Application } from 'express';

class App {
  public app: Application;

  public port: number;

  constructor(appInit: { port: number; controllers: Array<any>; middleWares: Array<any> }) {
    this.app = express();
    this.port = appInit.port;
    this.middlewares(appInit.middleWares);
    this.routes(appInit.controllers);
  }

  public listen(): void {
    this.app.listen(this.port, () => {
      console.log(`App has started on port ${this.port}`);
    });
  }

  private middlewares(middleWares: any): void {
    middleWares.forEach((middleware: any) => {
      this.app.use(middleware);
    });
  }

  private routes(controllers: any): void {
    controllers.forEach((controller: any) => {
      this.app.use(controller.path, controller.router);
    });
  }
}

export default App;
