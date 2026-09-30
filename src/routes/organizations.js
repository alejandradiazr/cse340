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
        .isLength({ max: 150 })
        .withMessage('Organization name cannot exceed 150 characters.'),
    body('description')
        .trim()
        .notEmpty()
        .withMessage('Organization description is required.'),
    body('contact_email')
        .trim()
        .notEmpty()
        .withMessage('Contact email is required.')
        .isEmail()
        .withMessage('Please enter a valid email address.')
        .isLength({ max: 255 })
        .withMessage('Contact email cannot exceed 255 characters.'),
    body('logo_filename')
        .optional({ values: 'falsy' })
        .trim()
        .isLength({ max: 255 })
        .withMessage('Logo filename cannot exceed 255 characters.'),
    updateOrganizationController
);

router.get('/edit-organization/:id', buildEditOrganization);

router.post(
    '/new-organization',
    body('name')
        .trim()
        .notEmpty()
        .withMessage('Organization name is required.')
        .isLength({ max: 150 })
        .withMessage('Organization name cannot exceed 150 characters.'),
    body('description')
        .trim()
        .notEmpty()
        .withMessage('Organization description is required.'),
    body('contact_email')
        .trim()
        .notEmpty()
        .withMessage('Contact email is required.')
        .isEmail()
        .withMessage('Please enter a valid email address.')
        .isLength({ max: 255 })
        .withMessage('Contact email cannot exceed 255 characters.'),
    body('logo_filename')
        .optional({ values: 'falsy' })
        .trim()
        .isLength({ max: 255 })
        .withMessage('Logo filename cannot exceed 255 characters.'),
    createNewOrganization
);

router.get('/organization/:id', buildOrganizationDetail);

export default router;