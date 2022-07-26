module.exports = {
	'env': {
		'node': true,
		'commonjs': true,
		'es2020': true,
		'jest': true
	},
	'parserOptions': {
		'ecmaVersion': 12,
	},
	'parser': 'babel-eslint',
	'rules': {
		'indent': [
			'error',
			'tab'
		],
		'linebreak-style': [
			'error',
			'unix'
		],
		'quotes': [
			'error',
			'single',
			{ 'avoidEscape': true}
		],
		'semi': [
			'error',
			'always'
		]
	}
};
