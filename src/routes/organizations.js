import express from 'express';

import { body } from 'express-validator';

import {
    buildOrganizations,
    buildOrganizationDetail,
    buildNewOrganization,
    createNewOrganization,
    buildEditOrganization,
    updateOrganizationController
} from '../controllers/organizations.js';

const router = express.Router();

router.get('/organizations', buildOrganizations);

router.get('/new-organization', buildNewOrganization);

router.post(
    '/edit-organization/:id',

    body('name')
        .trim()
        .notEmpty()
        .withMessage('Organization name is required.')
        .isLength({ min: 3 })
        .withMessage('Organization name must be at least 3 characters long.')
        .isLength({ max: 150 })
        .withMessage('Organization name cannot exceed 150 characters.'),

    body('description')
        .trim()
        .notEmpty()
        .withMessage('Organization description is required.')
        .isLength({ min: 3 })
        .withMessage('Organization description must be at least 3 characters long.'),

    body('contact_email')
        .trim()
        .notEmpty()
        .withMessage('Contact email is required.')
        .isLength({ min: 3 })
        .withMessage('Contact email must be at least 3 characters long.')
        .isEmail()
        .withMessage('Please enter a valid email address.')
        .isLength({ max: 255 })
        .withMessage('Contact email cannot exceed 255 characters.'),

    body('logo_filename')
        .notEmpty()
        .withMessage('Organization image is required.')
        .isLength({ min: 3 })
        .withMessage('Organization image must be at least 3 characters long.')
        .isLength({ max: 255 })
        .withMessage('Organization image cannot exceed 255 characters.'),

    updateOrganizationController
);

router.get('/edit-organization/:id', buildEditOrganization);

router.post(
    '/new-organization',

    body('name')
        .trim()
        .notEmpty()
        .withMessage('Organization name is required.')
        .isLength({ min: 3 })
        .withMessage('Organization name must be at least 3 characters long.')
        .isLength({ max: 150 })
        .withMessage('Organization name cannot exceed 150 characters.'),

    body('description')
        .trim()
        .notEmpty()
        .withMessage('Organization description is required.')
        .isLength({ min: 3 })
        .withMessage('Organization description must be at least 3 characters long.'),

    body('contact_email')
        .trim()
        .notEmpty()
        .withMessage('Contact email is required.')
        .isLength({ min: 3 })
        .withMessage('Contact email must be at least 3 characters long.')
        .isEmail()
        .withMessage('Please enter a valid email address.')
        .isLength({ max: 255 })
        .withMessage('Contact email cannot exceed 255 characters.'),

    createNewOrganization
);

router.get('/organization/:id', buildOrganizationDetail);

export default router;