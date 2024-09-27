import "./Search.css";
import PropTypes from "prop-types";
import { message, Spin } from "antd";
import { useState } from "react";
import { Link } from "react-router-dom";

const Search = ({ isSearchShow, setIsSearchShow }) => {
  const [searchResult, setSearchResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const apiUrl = import.meta.env.VITE_API_BASE_URL;

  const handleCloseModal = () => {
    setIsSearchShow(false);
    setSearchResult(null);
  };

  const handleSearch = async (e) => {
    setLoading(true);
    e.preventDefault();
    const productName = e.target[0].value;
    if (productName.trim().length === 0) {
      message.warning("Boş karakter arayamazsınız!");
      return;
    }
    try {
      const res = await fetch(
        `${apiUrl}/api/products/search/${productName.trim()}`
      );

      if (!res.ok) {
        message.error("Ürün getirme hatası");
        return;
      }
      const data = await res.json();
      setSearchResult(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`modal-search ${isSearchShow ? "show" : ""} `}>
      <div className="modal-wrapper">
        <h3 className="modal-title">Search for products</h3>
        <p className="modal-text">
          Start typing to see products you are looking for.
        </p>
        <form className="search-form" onSubmit={handleSearch}>
          <input type="text" placeholder="Search a product" />
          <button>
            <i className="bi bi-search"></i>
          </button>
        </form>
        <div className="search-results">
          <div className="search-heading">
            <h3>RESULTS FROM PRODUCT</h3>
          </div>
          <Spin spinning={loading}>
            <div
              className="results"
              style={{
                display: `${
                  searchResult?.length === 0 || !searchResult ? "flex" : "grid"
                }`,
              }}
            >
              {!searchResult && (
                <b
                  href="#"
                  className="result-item"
                  style={{
                    width: "100%",
                    justifyContent: "center",
                  }}
                >
                  Ürün Ara...
                </b>
              )}

              {searchResult?.length === 0 && (
                <a
                  href="#"
                  className="result-item"
                  style={{
                    justifyContent: "center",
                    width: "100%",
                  }}
                >
                  😔Aradığınız Ürün Bulunamadı😔
                </a>
              )}
              {searchResult?.map((data, index) => (
                <Link
                  to={`/product/${data._id}`}
                  className="result-item"
                  key={index}
                >
                  <img src={`${data.img[0]}`} className="search-thumb" alt="" />
                  <div className="search-info">
                    <h4>{data.name}</h4>
                    <span className="search-sku">SKU: PD0016</span>
                    <span className="search-price">
                      ${data.price.current.toFixed(2)}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </Spin>
        </div>
        <i
          className="bi bi-x-circle"
          id="close-search"
          onClick={() => {
            handleCloseModal();
          }}
        ></i>
      </div>
      <div
        className="modal-overlay"
        onClick={() => {
          handleCloseModal();
        }}
      ></div>
    </div>
  );
};

export default Search;

Search.propTypes = {
  setIsSearchShow: PropTypes.func,
  isSearchShow: PropTypes.bool,
};
