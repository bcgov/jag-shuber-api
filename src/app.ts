import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import Router from 'koa-router';
import './controllers';
import { RegisterRoutes } from './routes';
import morgan from 'koa-morgan';

const app = new Koa();
app.use(bodyParser());

// Construct the Router
const router = new Router({
    prefix: '/api'
});
RegisterRoutes(router);


router.get('/', async ctx => {
    ctx.body = {
        data: "Sheriff Scheduling API"
    }
});

// Register our Middleware
app
    .use(async (ctx, next) => {
        ctx.set('Content-Type', 'application/json');
        ctx.set('Access-Control-Allow-Origin', '*');
        ctx.set('Access-Control-Allow-Headers', 'smgov_userguid,smgov_userdisplayname,Content-Type, Authorization, Content-Length, X-Requested-With');
        await next();
    })
    .use(async (ctx, next) => {
        await next();
        if (ctx.status >= 400) {
            app.emit('error', ctx.body, ctx);
        }
    })
    .use(async (ctx, next) => {
        try {
            await next();
        } catch (err) {
            ctx.status = err.status || 500;
            ctx.body = err;
        }
    })
    .use(morgan(':method :status :url :req[smgov_userguid] - :response-time ms'))
    .use(router.routes())
    .use(router.allowedMethods());

app.on('error', (err, ctx) => {
    if (ctx.status == 404) {
        console.log(`NOT_FOUND ${ctx.request.url}`)
    } else if(ctx.status === 401){
        console.warn(`UNAUTHORIZED ${ctx.request.url}`)
    } else if (err && err!.message) {
        console.error(`APP_ERROR ${err.message}`);
    } else {
        console.error('APP_ERROR', err);
    }    
    
    console.log(err);
})

export default app;