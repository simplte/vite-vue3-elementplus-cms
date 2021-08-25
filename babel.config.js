module.exports = {
  presets: ['@babel/preset-env'],
  plugins: [
    [
      'component',
      {
        libraryName: 'element-plus',
        style: false,
      },
    ],
    function() {
      return {
        visitor: {
          MetaProperty(path) {
            path.replaceWithSourceString('process');
          },
        },
      };
    },
  ],
};
