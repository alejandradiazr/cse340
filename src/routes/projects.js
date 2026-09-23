import express from 'express';

import {
    buildProjects,
    buildProjectDetail
} from '../controllers/projects.js';

const router = express.Router();

router.get('/projects', buildProjects);

router.get('/project/:id', buildProjectDetail);

export default router;