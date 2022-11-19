import React, { Suspense, useMemo, useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';
import Navigation from '../components/Navigation/Navigation';
import AppRoutes from './route';
import ShopContext from '../common/shopContext';
import ErrorFallback from '../components/ErrorBoundary';

function Routing() {
  const [value, setValue] = useState({});
  const contextValue = useMemo(() => ({ value, setValue }), [value, setValue]);

  return (
    <Router>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <Suspense fallback={<div>Loading...</div>}>
          <ShopContext.Provider value={contextValue}>
            <Navigation />
            <AppRoutes />
          </ShopContext.Provider>
        </Suspense>
      </ErrorBoundary>
    </Router>
  );
}

export default Routing;
