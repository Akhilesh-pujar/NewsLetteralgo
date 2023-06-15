const router = require('express').Router();
const {  notification } = require('../controller/appController.js')


/** HTTP Reqeust */

router.post('/subscribed/notification', notification);

module.exports = router;