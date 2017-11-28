const db = require('./db.js');

const createReview = (userId, cityId, title, content) => {
  return db.one(`INSERT INTO reviews (user_id, city_id, title, content)
  VALUES ($1, $2, $3, $4) RETURNING *`,
    [userId, cityId, title, content])
    .catch((err) => {
      console.error(err, 'failed to create review');
    });
};

const deleteReview = (id) => {
  return db.none(`DELETE FROM reviews WHERE id=$1::int`, id)
    .catch((err) => {
      console.error(err, 'Error deleting review from db');
    });
};

const editReview = (id, title, content) => {
  return db.one(`UPDATE reviews
  SET title=$2, content=$3
  WHERE id=$1
  RETURNING *`,
    [id, title, content])
    .catch((err) => {
      console.error(err, 'Failed to edit review');
    });
};

const getReviewById = (id) => {
  return db.one(`SELECT * FROM reviews WHERE id=$1`, id)
    .catch((err) => {
      console.error(err, 'Failed to get review');
    });
};

module.exports = { createReview, deleteReview, editReview, getReviewById };
