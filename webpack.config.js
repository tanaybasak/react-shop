const path = require('path');
const Dotenv = require('dotenv-webpack');
// const HtmlWebpackPlugin = require('html-webpack-plugin');
const glob = require('glob');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const PurgecssPlugin = require('purgecss-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

/*We are basically telling webpack to take index.js from entry. Then check for all file extensions in resolve. 
After that apply all the rules in module.rules and produce the output and place it in main.js in the public folder.*/

const PATHS = {
	src: path.join(__dirname, 'src'),
};


module.exports = {
	/** "mode"
   * the environment - development, production, none. tells webpack
   * to use its built-in optimizations accordingly. default is production
   */

	mode: 'development',
	/** "entry"
   * the entry point
   */
	entry: './index.js',
	output: {
		/** "path"
	 * the folder path of the output file
	 */
		path: path.resolve(__dirname, 'build'),
		/** "filename"
	 * the name of the output file
	 */
		filename: 'main.js',
	},

	/** "target"
   *  setting "node" as target app (server side), and setting it as "web" is
   *  for browser (client side). Default is "web"
   * */

	target: 'web',
	devServer: {
		contentBase: './build',
		/** "port"
	 * port of dev server
	 */
		port: '9500',
		/** "static"
	 * This property tells Webpack what static file it should serve
	 */
		static: ['./public'],
		/** "open"
	 * opens the browser after server is successfully started
	 */
		open: true,
		/** "hot"
	 * enabling and disabling HMR. takes "true", "false" and "only".
	 * "only" is used if enable Hot Module Replacement without page
	 * refresh as a fallback in case of build failures
	 */
		hot: true,
		/** "liveReload"
	 * disable live reload on the browser. "hot" must be set to false for this to work
	 */
		liveReload: true,

		historyApiFallback: true, // historyAPIFallback will redirect 404s to /index.html.
	},
	resolve: {
		/** "extensions"
	 * If multiple files share the same name but have different extensions, webpack will
	 * resolve the one with the extension listed first in the array and skip the rest.
	 * This is what enables users to leave off the extension when importing
	 */

		extensions: ['.js', '.jsx', '.json'],
	},
	module: {
		/** "rules"
	 * This says - "Hey webpack compiler, when you come across a path that resolves to a '.js or .jsx'
	 * file inside of a require()/import statement, use the babel-loader to transform it before you
	 * add it to the bundle. And in this process, kindly make sure to exclude node_modules folder from
	 * being searched"
	 */

		rules: [
			{
				test: /\.(js|jsx)$/, //kind of file extension this rule should look for and apply in test
				exclude: /node_modules/, //folder to be excluded
				use: 'babel-loader', //loader which we are going to use
			},
			{
				test: /\.(scss|css)$/,
				exclude: /node_modules/,
				use: [
					{
						loader: 'style-loader',
					},
					{
						loader: 'css-loader',
					},
					{
						loader: 'postcss-loader',
						options: {
							postcssOptions: {
								plugins: () => [require('autoprefixer')],
							},
						},
					},
					{
						loader: 'sass-loader',
					},
				],
			},
			{
				test: /.(png|jpe?g|gif|webp|avif|svg)$/i,
				use: [{ loader: 'file-loader' }],
			},
		],
	},
	plugins: [
		new Dotenv({
			path: './environments/.env.development',
		}),
		new MiniCssExtractPlugin({
			filename: 'index.css',
		}),
		new PurgecssPlugin({
			paths: glob.sync(`${PATHS.src}/**/*`, { nodir: true }),
		}),
		new HtmlWebpackPlugin({
			template: path.resolve('./public/index.html'),
		}),
	],
};
