import React, { Suspense, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navigation from "../components/Navigation/Navigation";
import AppRoutes from "./route";
import ShopContext from "../common/shopContext";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "../components/ErrorBoundary";

function Routing() {
  const [value, setValue] = useState({});
  return (
    <Router>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <Suspense fallback={<div>Loading...</div>}>
          <ShopContext.Provider value={{ value, setValue }}>
            <Navigation />
            <AppRoutes />
          </ShopContext.Provider>
        </Suspense>
      </ErrorBoundary>
    </Router>
  );
}

export default Routing;
