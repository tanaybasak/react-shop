import React from "react";
import { Outlet, useRoutes } from "react-router-dom";
const NotFoundPage =  React.lazy(() => import("../components/NotFoundPage"));
const Cart = React.lazy(() => import("../components/Cart"));
const Account = React.lazy(() => import("../components/Account"));
const Home = React.lazy(() => import("../components/Home"));
const ProductList = React.lazy(() =>
  import("../components/Product/ProductList")
);
const ProductDetails = React.lazy(() => import("../components/ProductDetails"));
const AppRoutes = () => {
  const routes = useRoutes([
    {
      path: "/account",
      index: true,
      element: <Account />,
    },
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/cart",
      element: <Cart />,
    },
    {
      path: "*",
      element: <NotFoundPage />,
    },
    {
      path: "/products",
      children: [
        { element: <ProductList />, index: true },
        { path: ":id", element: <ProductDetails />, index: true },
      ],
    },
  ]);

  console.log(routes);

  return routes;
};

export default AppRoutes;
