import React, { useContext, useEffect, useState } from "react";
import i18next from "i18next";
import { useTranslation } from "react-i18next";
import i18n from "../../common/i18n";
import cart from "../../../public/assets/icons/cart.avif";
import person from "../../../public/assets/icons/person.avif";
import logout from "../../../public/assets/icons/logout.avif";
import create from "../../../public/assets/icons/create.avif";
import { NavLink } from "react-router-dom";
import ShopContext from "../../common/shopContext";
import { useMutation, useQuery } from "@apollo/client";
import ADD_TO_CART from "../../common/graphQlquery/addToCart";
import "./Navigation.scss";
import GET_CARTITEMS from "../../common/graphQlquery/getCartItems";

function Navigation() {
  const { value } = useContext(ShopContext);
  const { t } = useTranslation(["common"]);
  const [addCartItem, { loading, error, data }] = useMutation(ADD_TO_CART);
  const { data: cart_data } = useQuery(GET_CARTITEMS);

  const [cartResults, setCartResults] = useState({
    items: [],
    quantity: 0,
  });
  // setting language
  useEffect(() => {
    if (localStorage.getItem("i18nextLng").length > 2) {
      i18next.changeLanguage("en");
    }
  }, []);

  useEffect(() => {
    if (value.addToCart) {
      addCartItem({
        variables: {
          id: value.id,
        },
      });
    }
  }, [value]);

  useEffect(() => {
    if (data) {
      setCartResults({
        items: data.addToCart["items"],
        quantity: data.addToCart["quantity"],
      });
    }
  }, [data]);

  useEffect(() => {
    if (cart_data) {
      setCartResults({ quantity: cart_data.cartItems.items.length });
    }
  }, [cart_data]);

  // changing language for i18n
  const handleChangeLanguage = (e) => {
    i18n.changeLanguage(e.target.value);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <NavLink
        className={({ isActive }) =>
          isActive ? "nav-link active" : "nav-link"
        }
        exact={"true"}
        to="/"
      >
        {t("brand")}
      </NavLink>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarScroll"
        aria-controls="navbarScroll"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon" />
      </button>
      <div className="collapse navbar-collapse" id="navbarScroll">
        <ul
          className="navbar-nav m-auto my-2 my-lg-0 navbar-nav-scroll"
          style={{ maxHeight: 100 }}
        >
          <li className="nav-item">
            <NavLink
              exact={"true"}
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
              to="/cart"
            >
              {cartResults && (
                <div className="notify_count">{cartResults["quantity"]}</div>
              )}
              <img
                alt=""
                src={cart}
                className="nav-link-icons"
                loading="lazy"
              />
              {t("cart")}
              <span className="sr-only">(current)</span>
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              exact={"true"}
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
              to="/create"
            >
              <img
                alt=""
                src={create}
                className="nav-link-icons"
                loading="lazy"
              />
              {t("create")}
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              exact={"true"}
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
              to="/account"
            >
              <img
                alt=""
                src={person}
                className="nav-link-icons"
                loading="lazy"
              />
              {t("account")}
            </NavLink>
            {/* </Link> */}
          </li>
          <li className="nav-item">
            <NavLink
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
              to="/logout"
            >
              <img
                alt=""
                src={logout}
                className="nav-link-icons"
                loading="lazy"
              />
              {t("logout")}
            </NavLink>
          </li>
        </ul>
        <form className="d-flex">
          <select
            className="form-select"
            aria-label="language select"
            onChange={handleChangeLanguage}
            value={localStorage.getItem("i18nextLng")}
          >
            <option value="en"> En </option>
            <option value="fr"> Fr </option>
            <option value="es"> Es </option>
          </select>
        </form>
      </div>
    </nav>
  );
}

export default Navigation;
