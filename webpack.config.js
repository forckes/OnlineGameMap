module.exports = {
	// ...other configuration options
	module: {
		rules: [
			// ...other rules
			{
				test: /\.(png|jpe?g|gif)$/i,
				loader: 'file-loader',
				options: {
					name: '[name].[ext]',
					outputPath: 'images/',
					publicPath: '/images/' // Adjust the public path as per your setup
				}
			}
		]
	}
}
