const express = require('express')
const router = express.Router()

const User = require('../models/user')

const UserController = require ('../controllers/users')

router.post('/signup', UserController.user_signup)

router.post('/login', UserController.user_login)

router.delete('/:userId', (req, res, next) => {
  User.remove({
      _id: req.params.userId
    })
    .exec()
    .then(result => {
      result.status(200).json({
        message: 'User Deleted'
      })
    })
    .catch(err => {
      console.log(err)
      result.status(500).json({
        error: err
      })
    })
})

module.exports = router