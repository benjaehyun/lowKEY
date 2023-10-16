const express = require('express')
const router = express.Router()
const profilesCtrl = require('../../controllers/api/profiles')
const ensureLoggedIn = require('../../config/ensureLoggedIn')
const upload = require("multer")()


router.get ('/', profilesCtrl.details)
router.get ('/queue', profilesCtrl.queueIndex)
router.post ('/create', profilesCtrl.create)
router.post ('/token/update', profilesCtrl.updateToken)
router.post ('/add-user-info', profilesCtrl.addInfo)
router.post ('/add-photo', upload.array('photo', 6), profilesCtrl.addPhoto)
router.post ('/dislike', profilesCtrl.addDislike)
router.post ('/like', profilesCtrl.addLike)
router.post ('/match/add', profilesCtrl.addMatch)
router.get ('/match', profilesCtrl.getMatches)
router.post ('/match/data', profilesCtrl.getMatchData)
router.post ('/get-chatroom', profilesCtrl.getChatRoom)



module.exports = router;