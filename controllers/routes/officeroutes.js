const express = require('express');
const router = express.Router();
const officecontroller = require('../officecontroller');

router.get('/login',officecontroller.getLogin)
router.post('/login',officecontroller.postLogin);

router.get('/',officecontroller.getOfficeHome)
//router.get('/officeHome',officecontroller.getAgentsProfile);

router.get('/agents',officecontroller.getAgent)
router.get('/availableProperty',officecontroller.getavailableProperty )
router.get('/propertysold',officecontroller.getPropertySold )
router.get('/propertyrented',officecontroller.getPropertyRented )
router.get('/viewOwner',officecontroller.getViewOwner )
router.get('/addAgent',officecontroller.getaddAgent )
router.post('/addAgent',officecontroller.postaddAgent )



module.exports = router;