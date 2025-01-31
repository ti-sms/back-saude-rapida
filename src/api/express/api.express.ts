import { Api } from "../api";
import express, { Express, Request, Response } from "express";

export class ApiExpress implements Api {
  private constructor(readonly app: Express) {}

  public static build() {
    const app = express();
    app.use(express.json());
    return new ApiExpress(app);
  }

  public addGetRoute(
    path: string,
    handler: (req: Request, res: Response) => void,
    middlewares: any[] = []
  ): void {
    this.app.get(path,...middlewares, handler);
  }

  public addPostRoute(
    path: string,
    handler: (req: Request, res: Response) => void,
    middlewares: any[] = []
  ): void {
    this.app.post(path,...middlewares, handler);
  }

  public addUpdateRoute(
    path: string,
    handler: (req: Request, res: Response) => void,
    middlewares: any[] = []
  ): void {
    this.app.put(path,...middlewares, handler);
  }

  public start(port: number) {
    this.app.listen(port, () => {
      console.log("⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀");
      console.log("⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣴⠶⢦⣤⠶⠶⣄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀");
      console.log("⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀ ⣿⠀⠀⠁⠀ ⠀⢀⣿⠀⠀⠀⠀⠀⠀⠀⠀");
      console.log("⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠙⢧⣄⠀  ⣠⠞⠁⠀⠀⠀⠀");
      console.log("⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣀⡀⠀⠉⠛⠃⣠⣄⡀⠀⠀⠀⠀");
      console.log("⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⡞⠉⠙⢳⣄⢀⡾⠁⠈⣿⠀⠀⠀");
      console.log("⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢻⡄⠀⠀⠙⢿⡇⠀⢰⠇⠀⠀");
      console.log("⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠙⣦⡀⠀⠀⠹⣦⡟⠀⠀⠀⠀");
      console.log("⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⢳⣄⠀⠀⠈⠻⣄⠀⠀");
      console.log("⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⡞⠋⠛⢧⡀⠀⠀⠘⢷⡀⠀");
      console.log("⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢠⡴⠾⣧⡀⠀⠀⠹⣦⠀⠀⠈⢿⡄⠀");
      console.log("⠀⠀⠀⠀⠀⠀⠀⠀⠀⣀⣿⠀⠀⠈⠻⣄⠀⠀⠀⠀⠀⠀⠈⣷⠀⠀");
      console.log("⠀⠀⠀⠀⠀⠀⠀⢠⡟⠉⠛⢷⣄⠀⠀⠈⠀⠀⠀⠀⠀⠀⣰⠏⠀⠀");
      console.log("⠀⠀⠀⠀⠀⠀⠀⠀⢷⡀⠀⠀⠉⠃⠀⠀⠀⠀⠀⠀⠀⣴⠏⠀⠀⠀⠀");
      console.log("⠀⠀⠀⠀⠀⠀⠀⠀⠈⠻⣦⡀⠀⠀⠀⠀⠀⠀⢀⣠⠞⠁⠀⠀⠀⠀");
      console.log("⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠙⠶⣤⣤⣤⡤⠶⠋⠁⠀⠀");
      console.log("⠀⠀⠀⠀⠀⠀⠀");
      console.log(
        "Pode ficar tranquilo meu consagrado! O servidor está rodando na porta " +
          port +
          " 😎👍"
      );
      console.log("⠀⠀⠀⠀⠀⠀⠀");

      this.printRoutes();
    });
  }

  private printRoutes() {
    const routes = this.app._router.stack
      .filter((route: any) => route.route)
      .map((route: any) => {
        return {
          path: route.route.path,
          method: route.route.stack[0].method,
        };
      });

    console.log(routes);
  }
}
