import React, { useContext, useEffect, useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import GET_PRODUCTS from "../../common/graphQlquery/getProducts";
// import ADD_TO_CART from "./graphQlquery/addToCart";
// import { addToCart } from "./actions/index";
import "./product.scss";
import ShopContext from "../../common/shopContext";
// import { useDispatch } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
// import GET_CARTITEMS from "./graphQlquery/getCartItems";

function ProductList() {
  // const dispatch = useDispatch();
  let navigate = useNavigate();
  const [listItems, setListItems] = useState([]);
  const { value, setValue } = useContext(ShopContext);
  const {
    loading: products_loading,
    error: products_error,
    data: products_data,
    fetchMore,
  } = useQuery(GET_PRODUCTS, {
    variables: {
      limit: 6,
      afterCursor: "0",
    },
    fetchPolicy: "network-only",

    // notifyOnNetworkStatusChange: true,
  });

  const handleScroll = (event) => {
    const { scrollTop } = event.target.documentElement;
    const { innerHeight } = window;
    const { scrollHeight } = event.target.documentElement;
    if (scrollTop + innerHeight + 1 >= scrollHeight) {
      fetchMore({
        variables: {
          limit: 4,
          afterCursor: products_data.products.edges.length.toString(),
        },
        updateQuery: (prev, { variables, fetchMoreResult }) => {
          if (
            !fetchMoreResult ||
            prev.products.edges.length > parseInt(variables.afterCursor)
          ) {
            return prev;
          }
          return {
            products: {
              ...prev.products,
              edges: [
                ...prev.products.edges,
                ...fetchMoreResult.products.edges,
              ],
            },
          };
        },
      });
    }
  };

  const navigateToProductDetails = (id) => {
    navigate(`${id}`); //
  };

  const addToCartOnClick = (event, id) => {
    event.stopPropagation();
    setValue({
      addToCart: true,
      id: id,
    });
  };

  useEffect(() => {
    if (products_data) {
      setListItems(products_data.products.edges);
      console.log(products_data);
      window && window.addEventListener("scroll", handleScroll);
    }
    return () => {
      window && window.removeEventListener("scroll", handleScroll);
    };
  }, [products_data]);

  if (products_loading) return "Loading...";
  if (products_error) return new Error("Test error boundary");

  return (
    <div className="container p-5">
      <div className="card-deck">
        {listItems.map((product) => (
          <div
            className="col-md-4"
            onClick={(id) => navigateToProductDetails(product.node.id)}
            role="button"
            key={product.node.id}
          >
            <div className="card mb-4">
              <img
                className="card-img-top"
                src={product.node.image}
                height="180px"
                width="30%"
                alt={`Card_imagecap-${product.node.id}`}
              />
              <div className="card-body">
                <h5 className="card-title">{product.node.name}</h5>
                <p className="card-text">{product.node.description}</p>
                <div className="card-button">
                  <button
                    type="button"
                    className="add_button btn btn-dark"
                    aria-label="button"
                    onClick={(e, id) => addToCartOnClick(e, product.node.id)}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <Outlet />
    </div>
  );
}

export default ProductList;
