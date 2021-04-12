const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const passport = require('passport')

//Load User model
const User = require('../../models/User')
const Profile = require('../../models/Profile')
const Post = require('../../models/Post')

//Validation
const validatePostInput = require('../../validation/post')

//@route GET api/posts/test
//@desc Tests post route
//@access public
router.get('/test', (req, res) => res.json({ message: 'Posts Works' }))

//@route GET api/posts
//@desc Get all posts
//@access public
router.get('/', (req, res) => {
    Post.find()
        .sort({ date: -1 })
        .then(posts => res.json(posts))
        .catch(err => res.status(404).json({ nopostsfound: 'No posts found with that ID' }))
})

//@route GET api/posts/:id
//@desc Get a post by id
//@access public
router.get('/:id', (req, res) => {
    Post.findById(req.params.id)
        .then(post => res.json(post))
        .catch(err => res.status(404).json({ nopostfound: 'No post found with that ID' }))
})

//@route POST api/posts
//@desc Create Post
//@access private
router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => {
    const { errors, isValid } = validatePostInput(req.body)

    //Check validation
    if (!isValid) {
        return res.status(400).json(errors)
    }
    const newPost = new Post({
        text: req.body.text,
        name: req.body.name,
        avatar: req.body.avatar,
        user: req.user.id,
    })

    newPost.save().then(post => res.json(post))
})

//@route DELETE api/post/:id
//@desc Delete Post
//@access private
router.delete('/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
    Profile.findOne({ user: req.user.id })
        .then(profile => {
            Post.findById(req.params.id)
                .then(post => {
                    //Check for post owner
                    if (post.user.toString() !== req.user.id) {
                        return res.status(401).json({ notauthorized: 'User is not authorized' })
                    }
                    //Delete psot
                    post.remove().then(() => res.json({ success: 'Post deleted' }))
                })
                .catch(err => res.status(404).json({ postnotfound: 'No post found' }))
        })
})

//@route POST api/post/like/:id
//@desc Like Post
//@access private
router.post('/like/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
    Profile.findOne({ user: req.user.id })
        .then(profile => {
            Post.findById(req.params.id)
                .then(post => {
                    if (post.likes.filter(like => like.user.toString() === req.user.id).length > 0) {
                        return res.status(400).json({ alreadyliked: 'User already liked this post' })
                    }
                    //Add user id to likes array
                    post.likes.unshift({ user: req.user.id })

                    post.save().then(post => res.json(post))
                })
                .catch(err => res.status(404).json(err))
        })
})

//@route POST api/post/unlike/:id
//@desc Remove Like from Post
//@access private
router.post('/unlike/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
    Profile.findOne({ user: req.user.id })
        .then(profile => {
            Post.findById(req.params.id)
                .then(post => {
                    if (post.likes.filter(like => like.user.toString() === req.user.id).length == 0) {
                        return res.status(400).json({ notliked: 'You have not liked this post ' })
                    }
                    //Get the remove index
                    const removeIndex = post.likes.map(item => item.user.toString()).indexOf(req.user.id)

                    //Splice out of the array
                    post.likes.splice(removeIndex, 1)

                    post.save().then(post => res.json(post))
                })
                .catch(err => res.status(404).json(err))
        })
})

//@route POST api/post/comment/:id
//@desc Add a comment to a Post
//@access private
router.post('/comment/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
    const { errors, isValid } = validatePostInput(req.body)

    //Check validation
    if (!isValid) {
        return res.status(400).json(errors)
    }
    Post.findById(req.params.id)
        .then(post => {
            const newComment = {
                text: req.body.text,
                name: req.body.name,
                avatar: req.body.avatar,
                user: req.user.id
            }

            //Add comments to array
            post.comments.unshift(newComment)

            //save
            post.save().then(post => res.json(post))
        })
        .catch(err => res.status(404).json({ postnotfound: 'No post found' }))
})

//@route DELETE api/post/comment/:id/:comment_id
//@desc Remove comment from a post
//@access private
router.delete('/comment/:id/:comment_id', passport.authenticate('jwt', { session: false }), (req, res) => {
    Post.findById(req.params.id)
        .then(post => {
            //Check if comment exists
            if (post.comments.filter(comment => comment._id.toString() === req.params.comment_id).length === 0) {
                return res.status(404).json({ commentnotexists: 'Comment does not exists' })
            }

            //Get remove index
            const removeIndex = post.comments.map(item => item._id.toString).indexOf(req.params.comment_id)

            //Splice comment out of array
            post.comments.splice(removeIndex, 1)

            //Save
            post.save().then(post => res.json(post))
        })
        .catch(err => res.status(404).json({ postnotfound: 'No post found' }))
})

module.exports = router