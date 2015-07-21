module.exports = {
	entry: "./index.jsx",
	output: {
		path: "dist",
		filename: "bundle.js"
	},
	module: {
		loaders: [
			{ test: /.jsx?$/, loader: "babel-loader" }
		]
	}
};