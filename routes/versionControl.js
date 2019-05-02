//import { Router } from 'express';
const router = require('express-promise-router')();
import versionControlController from '../controllers/versionControl';

//const router = Router();

// GET - Retieve data with Key
// Input: params /[key]
// Output: key, value, createAt and updateAt
router.route('/:key').get(versionControlController.getKey);

// POST - Save new Key and value with current timestamp
// Input: {key: value}
// Output: key, value, createAt and updateAt
router.route('/').post(versionControlController.save);

export default router;