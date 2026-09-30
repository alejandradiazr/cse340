import express from 'express';
import { body } from 'express-validator';

import {
    buildProjects,
    buildNewProject,
    createNewProject,
    buildEditProject,
    updateProjectController,
    buildProjectDetail,
    buildProjectCategories,
    updateProjectCategoriesController
} from '../controllers/projects.js';

const router = express.Router();

router.get('/projects', buildProjects);

router.get('/new-project', buildNewProject);

router.post(
    '/new-project',
    body('organization_id')
        .notEmpty()
        .withMessage('Please select an organization.'),
    body('title')
        .trim()
        .notEmpty()
        .withMessage('Project title is required.'),
    body('description')
        .trim()
        .notEmpty()
        .withMessage('Project description is required.'),
    body('location')
        .trim()
        .notEmpty()
        .withMessage('Project location is required.'),
    body('date')
        .notEmpty()
        .withMessage('Project date is required.'),
    createNewProject
);

router.get('/edit-project/:id', buildEditProject);

router.post(
    '/edit-project/:id',
    body('organization_id')
        .notEmpty()
        .withMessage('Please select an organization.'),
    body('title')
        .trim()
        .notEmpty()
        .withMessage('Project title is required.'),
    body('description')
        .trim()
        .notEmpty()
        .withMessage('Project description is required.'),
    body('location')
        .trim()
        .notEmpty()
        .withMessage('Project location is required.'),
    body('date')
        .notEmpty()
        .withMessage('Project date is required.'),
    updateProjectController
);

router.get('/project/:id', buildProjectDetail);

router.get('/project/:id/categories', buildProjectCategories);

router.post(
    '/project/:id/categories',
    updateProjectCategoriesController
);

export default router;