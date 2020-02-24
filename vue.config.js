'use strict';
const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin'); // 静态文件拷贝插件
const CompressionPlugin = require('compression-webpack-plugin'); // gzip压缩
// 定义压缩文件类型
const productionGzipExtensions = ['js', 'css'];

const defaultSettings = require('./src/config/settings.js');
const cdn = {
  js: [
    // 可视化 js
    // 'http://192.168.0.4:8080/api-ksh/api?v=1.0&system=cs-ksh-home'
  ]
};

function resolve(dir) {
  return path.join(__dirname, dir);
}

const name = defaultSettings.title || '一体化指挥调度系统'; // page title
// If your port is set to 80,
// use administrator privileges to execute the command line.
// For example, Mac: sudo npm run
const port = 9528; // 开发环境端口

// All configuration item explanations can be find in https://cli.vuejs.org/config/
module.exports = {
  /**
   * You will need to set publicPath if you plan to deploy your site under a sub path,
   * for example GitHub Pages. If you plan to deploy your site to https://foo.github.io/bar/,
   * then publicPath should be set to "/bar/".
   * In most cases please use '/' !!!
   * Detail: https://cli.vuejs.org/config/#publicpath
   */
  // 部署应用包时的基本 URL
  publicPath: './',
  // 生成的生产环境构建文件的目录
  outputDir: 'dist',
  // 放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录。
  assetsDir: 'static',
  // lintOnSave设置为 true 时，eslint-loader 会将 lint 错误输出为编译警告
  lintOnSave: process.env.NODE_ENV === 'development',
  // 生产环境 sourceMap
  // 设为false打包时不生成.map文件
  productionSourceMap: false,
  devServer: {
    port: port,
    open: true,
    overlay: {
      warnings: false,
      errors: true
    },
    proxy: {
      // change xxx-api/login => mock/login
      // detail: https://cli.vuejs.org/config/#devserver-proxy
      [process.env.VUE_APP_BASE_API]: {
        target: `http://127.0.0.1:${port}/mock`,
        changeOrigin: true,
        pathRewrite: {
          ['^' + process.env.VUE_APP_BASE_API]: ''
        }
      }
    },
    after: require('./mock/mock-server.js')
  },
  // corsUseCredentials: false,
  // webpack 配置，键值对象时会合并配置，为方法时会改写配置
  configureWebpack: config => {
    const pluginData = [
      new CopyWebpackPlugin([{
        from: path.resolve(__dirname, './src/assets'), // 定义要拷贝的源文件
        to: './static', // 定义要拷贝到的目标文件夹
        ignore: ['.*'] // 忽略拷贝指定的文件
      }])
    ];
    if (process.env.NODE_ENV === 'production') {
      pluginData.push(new CompressionPlugin({
        filename: '[path].gz[query]',
        algorithm: 'gzip',
        test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'), // 匹配文件名
        minRatio: 0.8,
        threshold: 10240, // 对超过10K的数据进行压缩
        deleteOriginalAssets: false // 是否删除源文件
      }));
    }
    return {
      // provide the app's title in webpack's name field, so that
      // it can be accessed in index.html to inject the correct title.
      name: name,
      resolve: {
        alias: {
          '@': resolve('src')
        }
      },
      plugins: pluginData
    };
  },
  // webpack 链接 API，用于生成和修改 webapck 配置
  chainWebpack(config) {
    config.plugins.delete('preload'); // TODO: need test
    config.plugins.delete('prefetch'); // TODO: need test

    // set svg-sprite-loader
    config.module
      .rule('svg')
      .exclude.add(resolve('src/icons'))
      .end();
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end();
    // 换肤loader
    const scss = config.module.rule('scss').toConfig();
    const useable = { ...scss.oneOf[3], test: /\.useable.scss$/ };
    useable.use = [...useable.use];
    useable.use[0] = { loader: 'style-loader/useable' };
    config.module.rule('scss').merge({ oneOf: [useable] });
    // set preserveWhitespace
    config.module
      .rule('vue')
      .use('vue-loader')
      .loader('vue-loader')
      .tap(options => {
        options.compilerOptions.preserveWhitespace = true;
        return options;
      })
      .end();
    config.plugin('html').tap(args => {
      args[0].cdn = cdn;
      return args;
    });
    config
    // https://webpack.js.org/configuration/devtool/#development
      .when(process.env.NODE_ENV === 'development',
        config => config.devtool('inline-source-map')
      );

    config
      .when(process.env.NODE_ENV !== 'development',
        config => {
          config
            .plugin('ScriptExtHtmlWebpackPlugin')
            .after('html')
            .use('script-ext-html-webpack-plugin', [{
              // `runtime` must same as runtimeChunk name. default is `runtime`
              inline: /runtime\..*\.js$/
            }])
            .end();
          config
            .optimization.splitChunks({
              chunks: 'all',
              cacheGroups: {
                libs: {
                  name: 'chunk-libs',
                  test: /[\\/]node_modules[\\/]/,
                  priority: 10,
                  chunks: 'initial' // only package third parties that are initially dependent
                },
                elementUI: {
                  name: 'chunk-elementUI', // split elementUI into a single package
                  priority: 20, // the weight needs to be larger than libs and app or it will be packaged into libs or app
                  test: /[\\/]node_modules[\\/]_?element-ui(.*)/ // in order to adapt to cnpm
                },
                commons: {
                  name: 'chunk-commons',
                  test: resolve('src/components'), // can customize your rules
                  minChunks: 3, //  minimum common number
                  priority: 5,
                  reuseExistingChunk: true
                }
              }
            });
          config.optimization.runtimeChunk('single');
        }
      );
  }
};
