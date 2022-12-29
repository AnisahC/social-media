var express = require('express');
var router = express.Router();
const {getRecentPosts, getPostById, getCommentsForPostsById} = require('../middleware/posts');
const {isLoggedIn} = require('../middleware/protectors')

/* GET home page. */

router.get('/', getRecentPosts, function(req, res, next) {
  res.render('index', { title: 'CSC 317 App', name:"Anisah Chowdhury" });
});

router.get("/login", function(req, res) {
  res.render('login');
}); 

router.get("/register", function(req, res) {
  res.render('registration', {js:["validation.js"]})
});   

router.get("/postimage", isLoggedIn, function(req, res) {
  res.render('postimage')
});

router.get("/post/:id", function(req, res) {
  res.render('viewpost')
});

router.get("/forgotpassword", function(req, res) {
  res.render('forgotpass')
});

router.get("/posts/:id(\\d+)", getPostById, getCommentsForPostsById, function(req, res){
  res.render('viewpost', {js:["viewpost.js"]});
});

module.exports = router;
