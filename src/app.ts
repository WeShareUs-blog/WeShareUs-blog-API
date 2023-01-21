import * as Koa from 'koa';
import koaBody from 'koa-body';
import 'dotenv/config';
import { connectMysql } from './databases';
import { globalRouter } from './routes';

class App {
  private app;

  constructor() {
    this.app = new Koa();
    connectMysql();
    this.app.use(koaBody({ multipart: true }));
    this.app.use(globalRouter.middleware());
  }

  listen() {
    this.app.listen(3000, () => {
      console.log(`http://localhost:3000`);
    });
  }
}

export default App;
