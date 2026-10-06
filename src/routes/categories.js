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

import { requireLogin, requireRole } from '../middleware/auth.js';

const router = express.Router();

router.get('/categories', buildCategories);

router.get('/category/:id', buildCategoryDetail);

router.get(
    '/new-category',
    requireLogin,
    requireRole('admin'),
    buildNewCategory
);

router.post(
    '/new-category',

    requireLogin,
    requireRole('admin'),

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

router.get(
    '/edit-category/:id',
    requireLogin,
    requireRole('admin'),
    buildEditCategory
);

router.post(
    '/edit-category/:id',

    requireLogin,
    requireRole('admin'),

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