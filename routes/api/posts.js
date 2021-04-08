const express = require('express')
const router = express.Router()

//Load User model
const User =require('../../models/User')

//@route GET api/posts/test
//@desc Tests post route
//@access public
router.get('/test', (req, res) => res.json({ message: 'Posts Works' }))



module.exports = router