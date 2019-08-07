const RefPost = require('../models/refPost')
const mongoose = require('mongoose')

exports.refPosts_get_all =  (req, res) => {
  RefPost.find()
    .select('refCode refType user _id')
    .exec()
    .then(docs => {
      const response = {
        count: docs.length,
        refPosts: docs.map(doc => {
          return {
            _id: doc._id,
            refCode: doc.refCode,
            refType: doc.refType,
            user: doc.user,
            request: {
              type: 'GET', 
            }
          }
        })
      }
    // if (docs.length >= 0) {
      res.status(200).json(response)
    // } else {
    //   res.status(404).json({
    //     message:'No entries found'
    //   })
    // }
  }).catch(err => {
    console.log(err);
    res.status(500).json({
      error: err
    })
  })
}

exports.refPosts_post_refPost = (req, res) => {
  const refPost = new RefPost({
    _id: new mongoose.Types.ObjectId(),
    refCode: req.body.refCode,
    refType: req.body.refType,
    user: req.body.user
  })
  refPost
    .save()
    .then(result => {
      res.status(201).json({
        message: "Created reference post successfully",
        createdRefPost: {
          _id: result._id,
          refCode: result.refCode,
          refType: result.refType,
          user: result.user,
          request: {
            type: 'POST',
          }
        }
      }).catch(err => {
        res.status(500).json({
          error: err
        })
      })
    })
}

exports.refPosts_delete_refPost = (req, res) => {
  const id = req.params.refPostId
  RefPost.deleteOne({
    _id: id
  }).exec()
  .then(result => {
    res.status(200).json(result)
  }).catch(err => {
    res.status(500).json({
      error: err
    })
  })
}