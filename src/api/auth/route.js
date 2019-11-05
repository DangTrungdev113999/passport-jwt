const router = require('express').Router();
const jwt      = require('jsonwebtoken');
const passport = require('passport');

const authServiceAPI = require("./service");
const User = require("./../../models/User");
router.post("/register",async (req, res) => {
  let userItem = {  
    email: req.body.email,
    password: req.body.password
  }

  let newUser = await User.create(userItem);

  res.json(newUser);

})

router.post("/login",(req, res, next) => {
  passport.authenticate('local', {session: false}, (err, user, info) => {
    if (err || !user) {
        return res.status(400).json({
            message: info ? info.message : 'Login failed',
            user   : user
        });
    }

    req.login(user, {session: false}, (err) => {
        if (err) {
            res.send(err);
        }

        const token = jwt.sign(user, 'your_jwt_secret');

        return res.json({token});
      });
  })
(req, res);

});

module.exports = router;