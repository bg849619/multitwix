const Koa = require('koa');
const Router = require('@koa/router');
const mount = require('koa-mount');
const static = require('koa-static');
const bodyParser = require('koa-body-parser');
const app = new Koa();
const router = new Router();
const settings = require('./settings.json');

let streams = settings.defaultChannels;

router.get('/', (ctx, next) => {
    ctx.body = "Hello world!";
});

router.post('/streams', (ctx, next) => {
    streams = ctx.request.body;
    ctx.body = "Changed.";
});

router.get('/streams', ctx => {
    ctx.body = JSON.stringify(streams);
});

app.use(mount('/view', static('public/'))); // Serve static files.
app.use(bodyParser());
app.use(router.routes());
app.use(router.allowedMethods());
app.use(mount('/admin', static('admin/')));

app.listen(settings.port, () => {
    console.log(`Webserver Listening`);
});

console.log(
`MultiTwix
Multiple Twitch viewer for Vmix
Copyright 2023 - Blake Gall <blake@bgall.dev>
Refer to README.md distributed with this software for license information.
----------------------------
Management panel at http://localhost:${settings.port}/admin/
Viewer at http://localhost:${settings.port}/view/\n`
);