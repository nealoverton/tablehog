import { useEffect, useState } from "react";
import DetectableOverflow from "react-detectable-overflow";
import { gaugeReaction, formatDate } from "../utils/formatting";
import {
  fetchReviewByID,
  fetchReviewsByOwner,
  fetchUserByUsername,
} from "../utils/game-reviews-api";
import { UserSnippet } from "./UserSnippet";

export const Review = ({ review_id }) => {
  const [review, setReview] = useState({});
  const [user, setUser] = useState({});
  const [userReviews, setUserReviews] = useState();
  const [isloading, setIsLoading] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);
  const [date, setDate] = useState("");

  useEffect(() => {
    fetchReviewByID(review_id).then((res) => {
      setReview(res.review);
      setDate(formatDate(res.review.created_at));
      setIsLoading(false);

      fetchUserByUsername(res.review.owner).then((res) => {
        setUser(res.user);
      });

      fetchReviewsByOwner(res.review.owner).then((res) => {
        setUserReviews(res.total_count);
      });
    });
  }, []);

  const expandReview = () => {
    setIsExpanded(true);
  };

  return isloading ? (
    <p>Loading...</p>
  ) : (
    <div className="Review">
      <img
        src={review.review_img_url}
        className="Review__img"
        alt="A review image chosen by the author"
      />
      <h2 className="Review__title">{review.title}</h2>
      <p>{gaugeReaction(review.votes)}</p>

      <div className="Review__user-details">
        <UserSnippet user={user} />
        <p>|</p>
        <p>{userReviews} reviews</p>
      </div>

      <p className="Review__date">posted {date}</p>
      <div
        className={
          isExpanded ? "Review__body--expanded" : "Review__body--collapsed"
        }
      >
        <p>{review.review_body}</p>
      </div>

      <p
        className={isExpanded ? "hidden" : "Review__read-more"}
        onClick={expandReview}
      >
        read more
      </p>
      <div className="Review__footer">
        <div className="Review__footer__voting">
          <p>Do you agree?</p>
          <div className="Review__voting__buttons">
            <button className="Review__voting__button">
              <img
                src={require("../thumbs-up.png")}
                className="Review__voting__button__img--up"
              />
            </button>
            <button className="Review__voting__button">
              <img
                src={require("../thumbs-down.png")}
                className="Review__voting__button__img--down"
              />
            </button>
          </div>
        </div>
        <p>{review.comment_count} comments</p>
      </div>
    </div>
  );
};

export default Review;
