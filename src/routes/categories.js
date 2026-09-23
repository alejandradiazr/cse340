import express from 'express';

import {
    buildCategories,
    buildCategoryDetail
} from '../controllers/categories.js';

const router = express.Router();

router.get('/categories', buildCategories);

router.get('/category/:id', buildCategoryDetail);

export default router;