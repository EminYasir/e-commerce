import CategoryItem from "./CategoryItem"
import "./Categories.css"
import { useEffect, useState } from "react";

const Categories = () => {
  const [dataSource, setDataSource] = useState([]);

  const apiUrl = import.meta.env.VITE_API_BASE_URL;

  

  useEffect(()=>{
    const fetchCategories = async () => {
      try {
        const response = await fetch(`${apiUrl}/api/categories/`);
        if (response.ok) {
          const data = await response.json();
          setDataSource(data);
        } 
      } catch (error) {
        console.log("Veri Hatalı:", error);
      }
    }
    fetchCategories();
  },[apiUrl])


  return (
    <section className="categories">
    <div className="container">
      <div className="section-title">
        <h2>All Categories</h2>
        <p>Summer Collection New Morden Design</p>
      </div>
      <ul className="category-list">
        {dataSource.map((item)=>(<CategoryItem item={item} key={item._id}/>))}
        
      </ul>
    </div>
  </section>
  )
}

export default Categories