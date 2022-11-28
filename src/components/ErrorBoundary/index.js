import React from 'react';
import PropTypes from 'prop-types';

function ErrorFallback({ error, resetErrorBoundary }) {
	return (
		<div role="alert">
			<p>Something went wrong:</p>
			<pre>{error.message}</pre>
			<button onClick={resetErrorBoundary} type="button">Try again</button>
		</div>
	);
}

ErrorFallback.propTypes = {
	error: PropTypes.func.isRequired,
	resetErrorBoundary: PropTypes.func.isRequired,
};

export default ErrorFallback;
