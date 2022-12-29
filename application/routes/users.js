var express = require('express');
var router = express.Router();
const bcrypt = require('bcrypt');
const UserError = require('../helpers/error/UserError')
const db = require('../conf/database')

router.post("/register", function(req, res, next) {
  const {username, email, password} = req.body;

  //server side validation
  //check for duplicates
  db.query('select id from users where username=?', [username])
    .then(function([results, fields]){
      if(results && results.length == 0){
        return db.query('select id from users where email=?', [email])
      }else{
        throw new Error("Username already exists")
      }
    }).then(function([results, fields]){
      if(results && results.length == 0){
        return bcrypt.hash(password, 2);
      }else{
        throw new Error("Email already exists")
      }
    }).then(function(hashedPassword){
      return db.query('insert into users (username, email, password) value(?,?,?)', [username, email, hashedPassword])
    }).then(function([results, fields]){
      if(results && results.affectedRows == 1){
        res.redirect('/login')
      }else{
        throw new Error("User could not be made")
      }
    }).catch(function(err){
      next(err);
    });
  //insert into DB
  //respond
});
router.post("/forgotpassword", function(req, res, next){
  const {email} = req.body;

  db.query('select email from users where email=?', [email])
    .then(function([results, fields]){
      if(results && results.length == 1) {
        req.flash("success", `A link has been sent to your email.`)
        res.redirect("/login")
      }else{
        req.flash("error", "Failed Reset: Invalid email")
        res.redirect('/login');
      }
    }).catch(function(err){
      next(err);
    })
})
router.post("/login", function(req, res, next) {
  const {username, password} = req.body;

  let loggedUserId;
  let loggedUsername;
  
  db.query('select id, username, password from users where username=?', [username])
    .then(function([results, fields]) {
      if(results.length == 1) {
        loggedUserId = results[0].id;
        loggedUsername = results[0].username;
        let dbPassword = results[0].password;
        return bcrypt.compare(password, dbPassword);
      }else{
        throw new UserError("Failed Login: Invalid user credentials", "/login", 200);
      }
    }).then(function(passwordsMatched){
      if(passwordsMatched) {
        req.session.userId = loggedUserId;
        req.session.username = loggedUsername;
        req.flash("success", `Hi ${loggedUsername}, you are now logged in.`)
        req.session.save(function(saveErr){
          res.redirect('/');
        })
    
      }else{
        throw new UserError("Failed Login: Invalid user credentials", "/login", 200);
      }
    })
    .catch(function(err) {
      if(err instanceof UserError) {
          req.flash("error", err.getMessage());
          req.session.save(function(saveErr){
            res.redirect(err.getRedirectURL())
          })
      }else{
        next(err)
      }
    })
});

router.post("/logout", function(req, res, next){
  req.session.destroy(function(destroyError){
    if(destroyError){
      next(err);
    }else{
      res.json({
        status: 200,
        message:"You are logged out"
      });
    }
  })
});


module.exports = router;
