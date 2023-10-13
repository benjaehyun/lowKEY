const express = require('express')
const router = express.Router()
const profilesCtrl = require('../../controllers/api/profiles')
const ensureLoggedIn = require('../../config/ensureLoggedIn')


router.get ('/', profilesCtrl.details)
router.get ('/queue', profilesCtrl.queueIndex)
router.post ('/create', profilesCtrl.create)
router.post ('/token/update', profilesCtrl.updateToken)
router.post ('/add-user-info', profilesCtrl.addInfo)
router.post ('/dislike', profilesCtrl.addDislike)
router.post ('/like', profilesCtrl.addLike)
router.post ('/match', profilesCtrl.addMatch)



module.exports = router;