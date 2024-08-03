import "./Post.css";
import "../Rate/StarRating.css";

function Post(props) {
  return (
    <div className="post-container">
      <div className="post-wrapper">
        <div className="post-title">
          <h1>{props.title}</h1>
          <p>
            Postetd by{" "}
            <span style={{ textDecoration: "underline" }}>{props.writer}</span>
          </p>
        </div>
        <div className="star-rating">
          {[...Array(props.rating)].map(() => {
            return (
              <button type="button" name="rating">
                <span className="star" style={{ color: "gold" }}>
                  &#9733;
                </span>
              </button>
            );
          })}
        </div>
        <div className="post-content">
          <pre style={{ fontSize: "1rem", whiteSpace: "pre-wrap" }}>
            {props.content}
          </pre>
        </div>
      </div>
    </div>
  );
}

export default Post;
