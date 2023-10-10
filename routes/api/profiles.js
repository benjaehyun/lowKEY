const express = require('express')
const router = express.Router()
const profilesCtrl = require('../../controllers/api/profiles')
const ensureLoggedIn = require('../../config/ensureLoggedIn')


router.get ('/', profilesCtrl.details)
router.post ('/create', profilesCtrl.create)


module.exports = router;