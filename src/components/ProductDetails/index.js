import { useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import GET_PRODUCTSBYID from "../../common/graphQlquery/getProductsById";
import "./productDetails.scss";
const ProductDetails = () => {
  const { id } = useParams();
  const [productDetails, setProductDetails] = useState({});
  const {
    loading: products_loading,
    error: products_error,
    data: products_data,
    fetchMore,
  } = useQuery(GET_PRODUCTSBYID, {
    variables: {
      productsById: id,
    },
    fetchPolicy: "network-only",

    // notifyOnNetworkStatusChange: true,
  });

  useEffect(() => {
    if (products_data) {
      setProductDetails(products_data.productsById);
    }
  }, [products_data]);

  if (products_loading) return "Loading...";
  if (products_error) return new Error("ProductDetails error");
  console.log(productDetails.overview);
  return (
    <div className="pd">
      <div className="pd-leftcontainer">
        <div className="pd-image">
          <img
            role="presentation"
            height="100%"
            width="100%"
            src={productDetails.image}
            alt={productDetails.description}
          />
        </div>
      </div>
      <div className="pd-rightcontainer">
        <div className="pd-title display-3">{productDetails.name}</div>
        <div className="pd-description lead">{productDetails.description}</div>
        <div className="pd-price lead pb-1">
          <b> Rs. {productDetails.price}</b>
        </div>
        <div className="pd-overview display-3">
          <b>Product Overview </b>
        </div>
        <div className="pd-overview-details">
          {productDetails.overview && (
            <table class="table table-hover table-responsive table-borderless">
              <tbody>
                <tr>
                  <td>Brand</td>
                  <td>{productDetails.overview[0].brand}</td>
                </tr>
                <tr>
                  <td>Color</td>
                  <td>{productDetails.overview[0].color}</td>
                </tr>
                <tr>
                  <td>Features</td>
                  <td>{productDetails.overview[0].features}</td>
                </tr>
                <tr>
                  <td>Finish</td>
                  <td>{productDetails.overview[0].finish}</td>
                </tr>
                <tr>
                  <td>Material</td>
                  <td>{productDetails.overview[0].material}</td>
                </tr>
                <tr>
                  <td>Seater</td>
                  <td>{productDetails.overview[0].seater}</td>
                </tr>
                <tr>
                  <td>SKU</td>
                  <td>{productDetails.overview[0].sku}</td>
                </tr>
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
