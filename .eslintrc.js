module.exports = {
	extends: 'airbnb',
	plugins: ['react', 'jsx-a11y', 'import'],
	parser: '@babel/eslint-parser',
	parserOptions: {
		ecmaVersion: 8,
		requireConfigFile: false,
		ecmaFeatures: {
			experimentalObjectRestSpread: true,
			impliedStrict: true,
			classes: true,
		},
	},
	env: {
		browser: true,
		node: true,
		jasmine: true,
	},
	rules: {
		'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
		'linebreak-style': ['error', process.platform === 'win32' ? 'windows' : 'unix'],
		indent: [2, 'tab', { SwitchCase: 1, VariableDeclarator: 1 }],
		'no-tabs': 0,
		'react/prop-types': 0,
		'react/jsx-indent': [2, 'tab'],
		'react/jsx-indent-props': [2, 'tab'],
		'jsx-a11y/label-has-associated-control': ['error', {
			required: {
				some: ['nesting', 'id'],
			},
		}],
		'jsx-a11y/label-has-for': ['error', {
			required: {
				some: ['nesting', 'id'],
			},
		}],
	},
};
