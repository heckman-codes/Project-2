const router = require('express').Router();

router.use(require('./comments'));
router.use(require('./posts'));
router.use(require('./users'));

module.exports = router;