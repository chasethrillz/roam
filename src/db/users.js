const db = require('./db.js');
const bcrypt = require('bcrypt');

const createUser = (name, email, password, imageurl, currentcity) => {
  return db.oneOrNone(`
    INSERT INTO users (name, email, password, image_url, current_city)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *`, [name, email, password, imageurl, currentcity])
    .catch((err) => {
      return err;
    });
};

const saltPassword = (password, SaltRounds) => {
  return bcrypt.hash(password, SaltRounds);
};

const validateUser = (email) => {
  return db.oneOrNone(`SELECT * FROM users WHERE email=$1`,
    email)
    .catch((err) => {
      return err;
    });
};

const deleteUser = (id) => {
  return db.none(`DELETE FROM users WHERE id=$1`, id)
    .catch((err) => {
      return err;
    });
};

const getUserProfile = (id) => {
  return db.one(`
    SELECT * FROM users
    WHERE users.id = $1`, id)
    .catch(console.error);
};

const getUserReviews = (id) => {
  return db.any(`
    SELECT * FROM reviews
    WHERE user_id=$1
    ORDER BY id DESC
    `, id)
    .catch(console.error);
};


const getUserProfileAndReviews = (id) => {
  return db.any(`
    SELECT users.id, users.name, users.image_url, users.current_city,
    reviews.id AS reviewid,
    reviews.title, reviews.content
    FROM users
    JOIN reviews
    ON users.id = reviews.user_id
    WHERE users.id=$1
    ORDER BY reviews.id DESC`, id)
    .catch((err) => {
      console.error(err);
      return err;
    });
};

const editUserProfile = (id, name, currentcity) => {
  return db.one(`
    UPDATE users
    SET name=$2, current_city=$3
    WHERE id=$1
    RETURNING *
    `, [id, name, currentcity]);
};


module.exports = { createUser, deleteUser, editUserProfile, getUserProfile, getUserReviews, getUserProfileAndReviews, saltPassword, validateUser };
