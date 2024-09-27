import "./Tabs.css";
import Reviews from "../../Reviews/Reviews";
import { useState } from "react";
import PropTypes from "prop-types";

const Tabs = ({ singleProduct ,setSingleProduct}) => {
  const [active, setActive] = useState("desc");

  const handleTabClick = (e, tab) => {
    e.preventDefault();
    setActive(tab);
  };

  return (
    <div className="single-tabs">
      <ul className="tab-list">
        <li>
          <a
            href="#"
            className={`tab-button ${active === "desc" ? "active" : ""}`}
            onClick={(e) => handleTabClick(e, "desc")}
          >
            Description
          </a>
        </li>
        <li>
          <a
            href="#"
            className={`tab-button ${active === "info" ? "active" : ""}`}
            onClick={(e) => handleTabClick(e, "info")}
          >
            Additional information
          </a>
        </li>
        <li>
          <a
            href="#"
            className={`tab-button ${active === "reviews" ? "active" : ""}`}
            onClick={(e) => handleTabClick(e, "reviews")}
          >
            Reviews
          </a>
        </li>
      </ul>
      <div className="tab-panel">
        <div
          className={`tab-panel-descriptions content ${
            active === "desc" ? "active" : ""
          }`}
          id="desc"
        >
          <div
            className="product-description"
            dangerouslySetInnerHTML={{ __html: singleProduct.description }}
          ></div>
        </div>
        <div
          className={`tab-panel-information content ${
            active === "info" ? "active" : ""
          }`}
          id="info"
        >
          <h3>Additional information</h3>
          <table>
            <tbody>
              <tr>
                <th>Color</th>
                <td>
                  <p>
                    {singleProduct.colors.map((item, index) => (
                      <label
                        key={index}
                        style={{
                          background: `${item}`,
                          display: "inline-grid",
                          height: "30px",
                          width: "30px",
                          border: "1px solid",
                          borderRadius: "50%",
                          marginLeft: "5px",
                        }}
                      ></label>
                    ))}
                  </p>
                </td>
              </tr>
              <tr>
                <th>Size</th>
                <td>
                  <p>
                    {singleProduct.sizes.map((item, index) => (
                      <label
                        key={index}
                        style={{
                          marginLeft: "5px",
                        }}
                      >
                        {item.toUpperCase()}
                        {index < singleProduct.sizes.length - 1 && ", "}
                      </label>
                    ))}
                  </p>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <Reviews active={active === "reviews" ? "content active" : "content"} singleProduct={singleProduct} setSingleProduct={setSingleProduct}/>
      </div>
    </div>
  );
};

export default Tabs;

Tabs.propTypes = {
  singleProduct: PropTypes.object,
  setSingleProduct:PropTypes.func

};
