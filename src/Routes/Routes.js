import React, { Suspense } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';
import Navigation from '../components/Navigation';
import AppRoutes from './route';
import Provider from '../common/shopContext';
import ErrorFallback from '../components/ErrorBoundary';
import Loader from '../common/Loader/Loader';

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
