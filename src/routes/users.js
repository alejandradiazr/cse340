import express from 'express'

import { buildUsers } from '../controllers/users.js'
import { requireLogin, requireRole } from '../middleware/auth.js'

const router = express.Router()

/* ***************************
 * Users route
 * *************************** */
router.get(
    '/users',
    requireLogin,
    requireRole('admin'),
    buildUsers
)

export default router