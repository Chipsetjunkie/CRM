module.exports = {
  watch: true,
  performance: {
     maxEntrypointSize: 4000000,
     maxAssetSize: 1000000
  },
  entry: ['@babel/polyfill', './crm/frontend/src/index.js'],
  module: {
    rules: [

      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: 'file-loader',
          },
        ],
      },


    ]
  },

}
