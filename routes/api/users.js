const express = require('express')
const router = express.Router()
const usersCtrl = require('../../controllers/api/users')
const ensureLoggedIn = require('../../config/ensureLoggedIn')

// All paths start with '/api/users'
router.get('/check-token', ensureLoggedIn, usersCtrl.checkToken)

// POST /api/users
router.post ('/', usersCtrl.create)
router.post ('/login', usersCtrl.login)
router.post ('/add-spotify-token', usersCtrl.addSpotifyToken)

module.exports = router