import React from "react";
import Categories from "../components/Categories/Categories";
import Products from "../components/Products/Products";
import CampaingSingle from "../components/CampaingSingle/CampaingSingle";

const ShopPage = () => {
  return (
    <React.Fragment>
      <Categories></Categories>
      <Products></Products>
      <CampaingSingle></CampaingSingle>
      <Products></Products>
    </React.Fragment>
  );
};

export default ShopPage;
