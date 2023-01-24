import * as Koa from 'koa';
import koaBody from 'koa-body';
import * as koaLogger from 'koa-logger';
import * as koaCors from '@koa/cors';
import * as helmet from 'koa-helmet';
import 'dotenv/config';
import { connectMysql } from './databases';
import { globalRouter } from './routes';
import { errorHandler } from './middlewares/error-handler';

const isDev = process.env.NODE_ENV !== 'production';
class App {
  private app;

  constructor() {
    connectMysql().then(() => {
      console.log('connecting mysql!');
    });
    this.app = new Koa();
    this.app.use(errorHandler);
    this.app.use(helmet());
    this.app.use(
      koaCors({ origin: isDev ? 'http://localhost:3000' : 'https://weshareus-blog.com' })
    );
    this.app.use(koaBody({ multipart: true }));
    this.app.use(koaLogger());
    this.app.use(globalRouter.middleware());
  }

  listen() {
    this.app.listen(3000, () => {
      console.log(`http://localhost:3000`);
    });
  }
}

export default App;
