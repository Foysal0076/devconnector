const express = require('express')
const router = express.Router()
const gravatar = require('gravatar')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const keys = require('../../config/keys')
const passport = require('passport')

//Load input validation
const validateRegistration = require('../../validation/register')
const validateLoginInput = require('../../validation/login')

//@route GET api/users/test
//@desc Tests users route
//@access public
router.get('/test', (req, res) => res.json({ message: 'User Works' }))

//@route POST api/users/register
//@desc Register new user
//@access public
router.post('/register', (req, res) => {
    const { errors, isValid } = validateRegistration(req.body)

    //Check validation
    if (!isValid) {
        return res.status(400).json(errors)
    }

    User.findOne({ email: req.body.email })
        .then(user => {
            if (user) {
                return res.status(400).json({ email: 'Email Already exists' })
            } else {
                const avatar = gravatar.url(req.body.email, {
                    s: '200', //size
                    r: 'pg', //rating
                    d: 'mm' //default
                })

                const newUser = new User({
                    name: req.body.name,
                    email: req.body.email,
                    avatar,
                    password: req.body.password
                })

                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if (err) throw err
                        newUser.password = hash
                        newUser.save()
                            .then(user => res.json(user))
                            .catch(err => console.log(err))
                    })
                })
            }
        })
})

//@route POST api/users/login
//@desc Login user /returning token JWT
//@access public
router.post('/login', (req, res) => {

    const { errors, isValid } = validateLoginInput(req.body)

    //Check validation
    if (!isValid) {
        return res.status(400).json(errors)
    }
    const email = req.body.email
    const password = req.body.password


    //Find the user by email
    User.findOne({ email })
        .then(user => {
            //check for user
            if (!user) {
                errors.email = 'User not found'
                return res.status(404).json(errors)
            }

            //check password
            bcrypt.compare(password, user.password)
                .then(isMatch => {
                    if (isMatch) {
                        //User Matched

                        const payload = { //create JWT payload
                            id: user.id,
                            name: user.name,
                            avatar: user.avatar
                        }

                        //Sign Token
                        jwt.sign(
                            payload,
                            keys.secretOrKey,
                            { expiresIn: 3600 },
                            (err, token) => {
                                res.json({ success: true, token: 'Bearer ' + token })
                            })
                    } else {
                        errors.password = 'Password incorrect'
                        res.status(400).json(errors)
                    }
                })
        })
})

//@route POST api/users/current
//@desc Return current user
//@access private
router.get('/current', passport.authenticate('jwt', { session: false }), (req, res) => {
    res.json({
        id: req.user.id,
        name: req.user.name,
        email: req.user.email
    })
})

module.exports = router