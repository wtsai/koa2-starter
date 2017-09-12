const Koa = require('koa');
const path = require('path');
const logger = require('koa-logger');
const convert = require('koa-convert');
const koaStatic = require('koa-static');
const bodyParser = require('koa-bodyparser');
const Router = require('koa-router');
const index = require('./routes/index');
const users = require('./routes/users');

const app = new Koa();
const router = new Router();

router.use('/', index.routes(), index.allowedMethods());
router.use('/users', users.routes(), users.allowedMethods());

app.use(convert(logger()))
   .use(convert(bodyParser()))
   .use(convert(koaStatic(path.join(__dirname, 'public'), { hidden: true })))
   .use(router.routes())
   .use(router.allowedMethods())

app.listen(3000, () => console.log('Listening on port 3000.'));

