const router = require('express').Router();
const getReviewAndUser = require('../../db/reviews.js').getReviewAndUser;
const deleteReview = require('../../db/reviews.js').deleteReview;

router.get('/:id', (req, res) => {
  if (req.session.user) {
    const postId = req.params;
    let userMatches = false;
    return getReviewAndUser(postId.id)
      .then((review) => {
        if (req.session.user === review.user_id) {
          userMatches = true;
        } else {
          userMatches = false;
        }
        res.render('reviews/review_full', { review, userMatches });
      })
      .catch(console.error);
  } else {
    res.redirect('/');
  }
});

router.post('/:id', (req, res) => {
  const postId = req.params;
  return deleteReview(postId.id)
    .then((result) => {
      res.redirect('/profile');
    })
    .catch(console.error);
});


module.exports = router;
