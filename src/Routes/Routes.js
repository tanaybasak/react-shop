import React, { Suspense } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';
import AppRoutes from './route';
import Provider from '../common/shopContext';
import ErrorFallback from '../components/ErrorBoundary';
import Loader from '../common/components/Loader';

function Routing() {
	return (
		<Router>
			<ErrorBoundary FallbackComponent={ErrorFallback}>
				<Suspense fallback={<Loader />}>
					<Provider>
						<AppRoutes />
					</Provider>
				</Suspense>
			</ErrorBoundary>
		</Router>
	);
}

export default Routing;
