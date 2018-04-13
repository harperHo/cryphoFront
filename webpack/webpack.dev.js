const path = require('path');
// const HtmlWebpackPlugin = require('html-webpack-plugin');

// const babelQuery = {
// 	plugins: [
// 		['react-transform', {
// 	    transforms: [{
// 	      transform: 'react-transform-hmr',
// 	      imports: ['react'],
// 	      locals: ['module'],
// 	     }],
// 	  }],
// 	]
// }

module.exports = {
	devtool: 'eval-source-map',
	entry: './src/index.js',
	output: {
		filename: 'bundle.js',
		path: path.resolve(__dirname, '../build')
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					query: {
						presets: ['react', 'env', 'stage-0']
					}
				}
			}
		]
	},
	devServer: {
		port: 8080,
		open: true,
		contentBase: path.resolve(__dirname, '../build')
		// publicPath: 'http://localhost:8080/',
		// inline: true,
	},
}