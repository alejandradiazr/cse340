import express from 'express';
import { body } from 'express-validator';

import {
    buildProjects,
    buildNewProject,
    createNewProject,
    buildEditProject,
    updateProjectController,
    buildProjectDetail,
    addProjectVolunteer,
    removeProjectVolunteer,
    buildProjectCategories,
    updateProjectCategoriesController
} from '../controllers/projects.js';

import { requireLogin, requireRole } from '../middleware/auth.js';

const router = express.Router();

router.get('/projects', buildProjects);

router.get(
    '/new-project',
    requireLogin,
    requireRole('admin'),
    buildNewProject
);

router.post(
    '/new-project',

    requireLogin,
    requireRole('admin'),

    body('organization_id')
        .notEmpty()
        .withMessage('Please select an organization.'),

    body('title')
        .trim()
        .notEmpty()
        .withMessage('Project title is required.')
        .isLength({ min: 3 })
        .withMessage('Project title must be at least 3 characters long.'),

    body('description')
        .trim()
        .notEmpty()
        .withMessage('Project description is required.')
        .isLength({ min: 3 })
        .withMessage('Project description must be at least 3 characters long.'),

    body('location')
        .trim()
        .notEmpty()
        .withMessage('Project location is required.')
        .isLength({ min: 3 })
        .withMessage('Project location must be at least 3 characters long.'),

    body('date')
        .notEmpty()
        .withMessage('Project date is required.'),

    createNewProject
);

router.get(
    '/edit-project/:id',
    requireLogin,
    requireRole('admin'),
    buildEditProject
);

router.post(
    '/edit-project/:id',

    requireLogin,
    requireRole('admin'),

    body('organization_id')
        .notEmpty()
        .withMessage('Please select an organization.'),

    body('title')
        .trim()
        .notEmpty()
        .withMessage('Project title is required.')
        .isLength({ min: 3 })
        .withMessage('Project title must be at least 3 characters long.'),

    body('description')
        .trim()
        .notEmpty()
        .withMessage('Project description is required.')
        .isLength({ min: 3 })
        .withMessage('Project description must be at least 3 characters long.'),

    body('location')
        .trim()
        .notEmpty()
        .withMessage('Project location is required.')
        .isLength({ min: 3 })
        .withMessage('Project location must be at least 3 characters long.'),

    body('date')
        .notEmpty()
        .withMessage('Project date is required.'),

    updateProjectController
);

router.get('/project/:id', buildProjectDetail);

router.get(
    '/project/:id/volunteer',
    requireLogin,
    addProjectVolunteer
);

router.get(
    '/project/:id/volunteer/remove',
    requireLogin,
    removeProjectVolunteer
);

router.get(
    '/project/:id/categories',
    requireLogin,
    requireRole('admin'),
    buildProjectCategories
);

router.post(
    '/project/:id/categories',
    requireLogin,
    requireRole('admin'),
    updateProjectCategoriesController
);

export default router;