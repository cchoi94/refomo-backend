const express = require('express')
const router = express.Router()

const RefPostsController = require ('../controllers/refPosts')

const checkAuth = require ('../middleware/checkAuth')

router.get('/', RefPostsController.refPosts_get_all)

router.post('/', checkAuth, RefPostsController.refPosts_post_refPost)

router.delete('/:refPostId', checkAuth, RefPostsController.refPosts_delete_refPost)

module.exports = router;