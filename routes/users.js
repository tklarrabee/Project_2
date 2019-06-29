const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');

var db = require("../models/User");


// Login Page 
router.get('/login', (req,res) => res.render('login'));

// Register Page 
router.get('/register', (req,res) => res.render('register'));

// Register Handle
router.post('/register', (req, res) => {
    const {name, email, password, password2} = req.body;

    let errors = [];
    
    // Check required fields
    if(!name || !email || !password || !password2) {
         errors.push({ msg: 'Please enter all fields' });
    }

    // Check passwords match 
    if (password !== password2) {
        errors.push({ msg: 'Password does not match'})
    }

    // Check passwords length
    if (password.length < 6) {
    errors.push({ msg: 'Password must be at least 6 characters' });
  }

  if (errors.length > 0) {
      res.render('register', {
          errors,
          name, 
          email,
          password,
          password2
      });
  } else {
      // Validation Passed
      db.User.findOne({ 
          where: {
              email: email 
              }
          }).then(user => {
          if (user) {
              // User exists
              errors.push({ msg: 'Email already registed'});
              res.render('register', {
          errors: errors,
          name: name, 
          email: email,
          password: password,
          password2: password2
        });
        } else {
            const newUser = new User({
                name: name, 
                email: email,
                password: password
            });

            console.log(newUser)
            res.send('Hello');
        }
    })
  }
})

module.exports = router;
