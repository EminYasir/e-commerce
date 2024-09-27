import Categories from "../components/Categories/Categories";
import Products from "../components/Products/Products";
import Sliders from "../components/Slider/Sliders";
import Campaigns from "../components/Campaigns/Campaigns";
import Blogs from "../components/Blogs/Blogs";
import Brands from "../components/Brands/Brands";
import CampaingSingle from "../components/CampaingSingle/CampaingSingle";

const HomePages = () => {
  return (
    <>
      <Sliders></Sliders>
      <Categories></Categories>
      <Products></Products>
      <Campaigns></Campaigns>
      <Products></Products>
      <Blogs></Blogs>
      <Brands></Brands>
      <CampaingSingle></CampaingSingle>
    </>
  );
};

export default HomePages;
