import PropTypes from "prop-types";

const ReviewItem = ({ item }) => {
  const star = item.rating;
  const options = { year: "numeric", month: "long", day: "numeric" };
  const formattedDate = new Date(item.review.createdAt).toLocaleDateString(
    "tr-TR",
    options
  );
  const nul = 5 - star;
  return (
    <li className="comment-item">
      <div className="comment-avatar">
        <img src={`${item.user.avatar}`}  style={{height:"50px"}} alt="" />
      </div>
      <div className="comment-text">
        <ul className="comment-star">
          {Array.from({ length: star }).map((_, index) => (
            <li key={index}>
              <i className="bi bi-star-fill"></i>
            </li>
          ))}
          {Array.from({ length: nul }).map((_, index) => (
            <li key={index}>
              <i className="bi bi-star"></i>
            </li>
          ))}
        </ul>
        <div className="comment-meta">
          <strong>admin</strong>
          <span> - </span>
          <time>{formattedDate}</time>
        </div>
        <div className="comment-description">
          <p>{item.review.text}</p>
        </div>
      </div>
    </li>
  );
};

export default ReviewItem;

ReviewItem.propTypes = {
  item: PropTypes.object,
};
