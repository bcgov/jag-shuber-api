import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import Router from 'koa-router';
import './controllers';
import { RegisterRoutes } from './routes';
//const Koa = require('koa');

const app = new Koa();
app.use(bodyParser());

// Construct the Router
const router = new Router({
    prefix: '/api'
});
RegisterRoutes(router);


router.get('/', async ctx => {
    ctx.body = {
        data: "Sending some JSON"
    }
})

// Register our Middleware
app
    .use(async (ctx, next) => {
        try {
            await next();
        } catch (err) {
            ctx.status = err.status || 500;
            ctx.body = err.message;
            ctx.app.emit('error', err, ctx);
        }
    })
    .use(async (ctx, next) => {
        const start = Date.now();
        await next();
        const ms = Date.now() - start;
        console.log(`${ctx.method} ${ctx.url} - ${ms}`);
    })
    .use(router.routes())
    .use(router.allowedMethods());

export default app;