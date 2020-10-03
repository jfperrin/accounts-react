const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = app => {
  app.use(
    '^/graphql',
    createProxyMiddleware({
      target: 'ws://localhost:4123',
      ws: true,
      changeOrigin: true,
    }),
  );
};
