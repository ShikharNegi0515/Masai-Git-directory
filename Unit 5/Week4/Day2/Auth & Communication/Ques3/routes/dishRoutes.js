const express = require('express');
const router = express.Router();
const dishController = require('../controllers/dishController');
const auth = require('../middleware/auth');
const roles = require('../middleware/roles');

router.get('/', dishController.getDishes);
router.post('/', auth, roles('admin'), dishController.createDish);
router.patch('/:id', auth, roles('admin'), dishController.updateDish);
router.delete('/:id', auth, roles('admin'), dishController.deleteDish);

module.exports = router;
