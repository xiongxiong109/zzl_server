// 在express中使用es6语法, 在./bin/www中require babel实现es6
import express from 'express'
import path from 'path'
// import favicon from 'serve-favicon'
import logger from 'morgan'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'

import fetch from './middlewares/fetch'
import routes from './routes'
import ssrRoutes from './routes/ssrRoutes'
import mockApis from './routes/mockApis'
import nuxtMockApis from './routes/nuxtMock'
import apis from './routes/apis'
import qqMusicApis from './routes/qqMusic'
import nightSpider from './routes/nightSpider'

import CONFIG from './config'
import webpack from 'webpack'
import webpackDevMiddleware from 'webpack-dev-middleware'
import clientConfig from './build/webpack.client.config'
import serverConfig from './build/webpack.server.config'

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(fetch); // fetch middleware

// webpack dev
let { Env } = CONFIG;
if (Env == 'DEV') {
  // 在dev环境下, 启用webpackDevMiddleware进行webpack打包,
  // 但是这个时候打包出来的文件并没有生成到dist目录下
  // 而是以webpack dev server 的path存在内存中的
  // 虚拟目录可以通过/public/来获取webpack打包后的静态资源
  // 这个webpackDevMiddleware其实也是一个中间件,如果想让/public/
  // 生效, 则必须保证中间件路由的顺序
  // app.use(webpackDevMiddleware(webpack(clientConfig), {
  //   publicPath: '/',
  //   stats: {
  //     colors: true
  //   }
  // }));
  // app.use(webpackDevMiddleware(webpack(serverConfig), {
  //   stats: {
  //     colors: true
  //   },
  //   serverSideRender: true
  // }));
}

app.use('/qq_music', qqMusicApis);
app.use('/testApis', mockApis);
app.use('/nuxt/mock', nuxtMockApis);
app.use('/nightmare', nightSpider);
app.use('/1.0.0/web/', apis);
app.use('/ssr', ssrRoutes); // 服务端渲染页面
app.use('/', routes); // 这个中间件里面放了vue router /* 匹配404路由, 所以/ssr要放在上面

// catch 404 and forward to error handler
app.use((req, res, next) => {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
