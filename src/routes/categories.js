import { body } from 'express-validator';
import express from 'express';

import {
    buildCategories,
    buildCategoryDetail,
    buildNewCategory,
    createNewCategory,
    buildEditCategory,
    updateCategoryController
} from '../controllers/categories.js';

const router = express.Router();

router.get('/categories', buildCategories);

router.get('/category/:id', buildCategoryDetail);

router.get('/new-category', buildNewCategory);

router.post(
    '/new-category',
    body('name')
        .trim()
        .notEmpty()
        .withMessage('Category name is required.')
        .isLength({ max: 100 })
        .withMessage('Category name cannot exceed 100 characters.')
        .isLength({ min: 3 })
        .withMessage('Category name must be at least 3 characters long.'),
    createNewCategory
);

router.get('/edit-category/:id', buildEditCategory);

router.post(
    '/edit-category/:id',
    body('name')
        .trim()
        .notEmpty()
        .withMessage('Category name is required.')
        .isLength({ max: 100 })
        .withMessage('Category name cannot exceed 100 characters.')
        .isLength({ min: 3 })
        .withMessage('Category name must be at least 3 characters long.'),
    updateCategoryController
);

export default router;