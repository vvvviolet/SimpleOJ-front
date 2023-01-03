/**
 * 在生产环境 代理是无法生效的，所以这里没有生产环境的配置
 * -------------------------------
 * The agent cannot take effect in the production environment
 * so there is no configuration of the production environment
 * For details, please see
 * https://pro.ant.design/docs/deploy
 */
export default {
  dev: {
    // localhost:8000/api/** -> https://preview.pro.ant.design/api/**
    '/api/': {
      // 要代理的地址
      // target: 'http://124.223.95.200',
      // target: 'http://150.158.80.33:5000',
      target: 'http://41083a61b7332265.natapp.cc:44443',
      // 配置了这个可以从 http 代理到 https
      // 依赖 origin 的功能可能需要这个，比如 cookie
      changeOrigin: true,
      secure: false,
    },
  },
  start: {
    // localhost:8000/api/** -> https://preview.pro.ant.design/api/**
    '/api/': {
      // 要代理的地址
      // target: 'https://150.158.80.33:5000',
      target: 'http://41083a61b7332265.natapp.cc:44443',
      // target: 'http://124.223.95.200',
      // 配置了这个可以从 http 代理到 https
      // 依赖 origin 的功能可能需要这个，比如 cookie
      changeOrigin: true,
      secure: false,
    },
  },
};
