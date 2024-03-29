import axios from "axios";

const gamesApi = axios.create({
  baseURL: "https://board-game-reviews.onrender.com/api",
});

export const fetchReviews = (queries) => {
  const url = "/reviews";

  return gamesApi.get(url, { params: queries }).then((res) => {
    return res.data;
  });
};

export const fetchReviewByID = (review_id) => {
  const url = `/reviews/${review_id}`;
  return gamesApi.get(url).then((res) => {
    return res.data;
  });
};

export const postReview = (owner, title, review_body, designer, category) => {
  const url = `/reviews`;

  return gamesApi
    .post(url, { owner, title, review_body, designer, category })
    .then((res) => {
      return res.data;
    });
};

export const deleteReview = (review_id) => {
  const url = `/reviews/${review_id}`;

  return gamesApi.delete(url);
};

export const fetchCommentsbyReviewID = (review_id) => {
  const url = `/reviews/${review_id}/comments`;

  return gamesApi.get(url).then((res) => {
    return res.data;
  });
};

export const postComment = (review_id, username, body) => {
  const url = `/reviews/${review_id}/comments`;

  return gamesApi.post(url, { username: username, body: body }).then((res) => {
    return res.data;
  });
};

export const deleteComment = (comment_id) => {
  const url = `/comments/${comment_id}`;

  return gamesApi.delete(url);
};

export const fetchUserByUsername = (username) => {
  const url = `/users/${username}`;
  return gamesApi.get(url).then((res) => {
    return res.data;
  });
};

export const fetchCategories = () => {
  const url = `/categories`;

  return gamesApi.get(url).then((res) => {
    return res.data;
  });
};

export const updateVotes = (comment_id, inc_votes, target) => {
  const url = `/${target}/${comment_id}`;

  return gamesApi.patch(url, { inc_votes }).then((res) => {
    return res.data;
  });
};
