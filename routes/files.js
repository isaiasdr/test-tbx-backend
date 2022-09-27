const { Router } = require('express');
//const { check } = require('express-validator');
const { getData, getList } = require('../controllers/files');

const router = Router();

router.get("/data", getData);
router.get("/list", getList);


module.exports = router;