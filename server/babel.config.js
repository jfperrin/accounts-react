module.exports = function (api) {
  api.cache(true);

  return {
    presets: [
      [
        '@babel/preset-env',
        {
          targets: {
            node: true,
          },
        },
      ],
    ],
    plugins: ['@babel/plugin-syntax-object-rest-spread'],
  };
};
