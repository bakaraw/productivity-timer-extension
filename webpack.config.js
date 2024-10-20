const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
	entry: {
		main: './src/index.tsx',
		background: './src/background/background.ts',
	},
	output: {
		filename: '[name].bundle.js',
		path: path.resolve(__dirname, 'build')
	},
	mode: 'development',
	resolve: {
		extensions: ['.tsx', '.ts', '.js', '.jsx']
	},
	module: {
		rules: [
			{
				test: /\.(ts|tsx)$/,
				exclude: /node_modules/,
				use: 'babel-loader'
			},
			{
				test: /\.css$/, // Target .css files
				use: [
					'style-loader', // Injects styles into the DOM
					'css-loader',   // Resolves @import and url() in CSS
					{
						loader: 'postcss-loader',
						options: {
							postcssOptions: {
								plugins: [
									require('tailwindcss'),
									require('autoprefixer'),
								],
							},
						},
					},
				],
			},
			{
				test: /\.(png|jpe?g|gif)$/i,  // Matches image formats
				type: 'asset/resource',       // Emits a separate file and exports the URL
			},
			{
				test: /\.svg$/,
				type: 'asset/inline',         // Inlines the SVG as a base64 URI
			},
		]
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: './public/index.html'
		}),
		new CopyPlugin({
			patterns: [
				{ from: 'public/favicon.ico', to: 'favicon.ico' },
				{ from: 'public/manifest.json', to: 'manifest.json' },
				{ from: 'public/robots.txt', to: 'robots.txt' },
				{ from: 'public/logo192.png', to: 'logo192.png' },
				{ from: 'public/logo512.png', to: 'logo512.png' },
			]
		})

	],
};
