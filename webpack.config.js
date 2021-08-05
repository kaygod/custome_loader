const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require("path");

module.exports = {
  entry:path.resolve(__dirname,"./src/index.js"),
  mode:"development",
  output:{
    path:path.resolve(__dirname,"dist"),
    filename:"bundle.js"
  },
  module:{
    rules:[
      {
        test:/\.js$/,
        use:[
          {
            loader:path.resolve(__dirname,"./error-loader.js")
          },
          {
            loader:path.resolve(__dirname,"./test-loader.js"),
            options:{
              name:"hello",
              ob:{test:321}
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template:path.resolve(__dirname,"./src/index.html")
    })
  ]
}