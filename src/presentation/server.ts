import express, { Router } from 'express';
import path from 'path';



interface Options {
  port: number;
  host: string;
  routes: Router;
  public_path?: string;
}


export class Server {

  public readonly app = express();
  private readonly port: number;
  private readonly host: string;
  private readonly publicPath: string;
  private readonly routes: Router;

  constructor(options: Options) {

    // const {swaggerDocs}= require('swagger');
    const { port, host, routes, public_path = 'public', } = options;
    this.port = port;
    this.host = host;
    this.publicPath = public_path;
    this.routes = routes;
  }

  async start() {

    process.env.TZ = 'America/Guatemala';

    // Ruta para obtener la hora del servidor
    this.app.get('/time', (req, res) => {
      const serverTime = new Date().toString();
      res.send(`La hora del servidor es: ${serverTime}`);
    });

    //* Middlewares
    this.app.use(express.json()); // raw
    this.app.use(express.urlencoded({ extended: true })); // x-www-form-urlencoded


    //* Public Folder
    this.app.use(express.static(this.publicPath));

    //* Docs

    //* Routes
    this.app.use(this.routes);

    //* SPA /^\/(?!api).*/  <== Únicamente si no empieza con la palabra api
    this.app.get('*', (req, res) => {
      const indexPath = path.join(__dirname + `../../../${this.publicPath}/index.html`);
      res.sendFile(indexPath);
    });


    //Comentario de prueba
    // this.app.listen(this.port,this.host, () => {
    //   console.log(`Server running on port ${ this.port }`);

    // });

    this.app.listen(this.port,'10.111.54.64', () => {
      console.log(`Server running on port ${ this.port }`);

    });
  }

}