import express from 'express'

import { requireLogin } from '../middleware/auth.js'

const router = express.Router()

router.get('/dashboard', requireLogin, (req, res) => {
    res.render('dashboard', {
        title: 'Dashboard',
        account_firstname: req.session.account_firstname,
        account_type: req.session.account_type
    })
})

export default router