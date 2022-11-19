import React, { useContext, useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { Outlet, useNavigate } from 'react-router-dom';
import GET_PRODUCTS from '../../common/graphQlquery/getProducts';

import './product.scss';
import ShopContext from '../../common/shopContext';

function ProductList() {
  // const dispatch = useDispatch();
  const navigate = useNavigate();
  const [listItems, setListItems] = useState([]);
  const [setValue] = useContext(ShopContext);
  const {
    loading: productsLoading,
    error: productsError,
    data: productsData,
    fetchMore,
  } = useQuery(GET_PRODUCTS, {
    variables: {
      limit: 6,
      afterCursor: '0',
    },
    fetchPolicy: 'network-only',

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
          afterCursor: productsData.products.edges.length.toString(),
        },
        updateQuery: (prev, { variables, fetchMoreResult }) => {
          if (
            !fetchMoreResult
            || prev.products.edges.length > parseInt(variables.afterCursor, 10)
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
      id,
    });
  };

  const keydown = () => {};

  useEffect(() => {
    if (productsData) {
      setListItems(productsData.products.edges);
      window.addEventListener('scroll', handleScroll);
    }
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [productsData]);

  if (productsLoading) return 'Loading...';
  if (productsError) return new Error('Test error boundary');

  return (
    <div className="container p-5">
      <div className="card-deck">
        {listItems.map((product) => (
          <div
            className="col-md-4"
            onClick={() => navigateToProductDetails(product.node.id)}
            role="button"
            onKeyDown={keydown}
            tabIndex={0}
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
                    onClick={(e) => addToCartOnClick(e, product.node.id)}
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
