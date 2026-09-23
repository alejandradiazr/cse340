import express from 'express';

import {
    buildOrganizations,
    buildOrganizationDetail
} from '../controllers/organizations.js';

const router = express.Router();

router.get('/organizations', buildOrganizations);

router.get('/organization/:id', buildOrganizationDetail);

export default router;