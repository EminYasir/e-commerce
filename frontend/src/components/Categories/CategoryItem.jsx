import "./CategoryItem.css"
import PropTypes from "prop-types"

const CategoryItem = ({item}) => {
  return (
    <li className="category-item">
          <a href="#">
            <img src={item.img} alt="" className="category-image"/>
            <span className="category-title">{item.name}</span>
          </a>
        </li>
  )
}

export default CategoryItem

CategoryItem.propTypes={
  item:PropTypes.object
}