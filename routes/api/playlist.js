const express = require('express')
const router = express.Router()
const playlistCtrl = require('../../controllers/api/playlist')
const ensureLoggedIn = require('../../config/ensureLoggedIn')

router.get ('/', playlistCtrl.getOne)
router.post ('/create', playlistCtrl.createPlaylist)
router.post ('/add-features', playlistCtrl.addFeatures)
router.post ('/top/create', playlistCtrl.createTop)



module.exports = router;