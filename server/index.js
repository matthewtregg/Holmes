const koa = require('koa');
const cors = require('koa-cors');
const bodyParser = require('koa-bodyparser');
const router = require('./router');
const app = new koa();
const PORT = 4000;
app.use(cors());
app.use(bodyParser());
app.use(router.routes());
app.use(router.allowedMethods());

app.listen(PORT, ()=> { console.log('port is listening on 4000 ');} );// eslint-disable-line no-console
