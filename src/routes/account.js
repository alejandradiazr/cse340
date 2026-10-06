import express from 'express'
import { body } from 'express-validator'

import {
    buildRegister,
    registerAccountController,
    buildLogin,
    loginAccount,
    logoutAccount
} from '../controllers/account.js'

const router = express.Router()

/* ***************************
 * Registration
 * ************************** */
router.get('/account/register', buildRegister)

router.post(
    '/account/register',
    [
        body('account_firstname')
            .trim()
            .notEmpty()
            .withMessage('First name is required.')
            .isLength({ max: 50 })
            .withMessage('First name cannot exceed 50 characters.'),

        body('account_lastname')
            .trim()
            .notEmpty()
            .withMessage('Last name is required.')
            .isLength({ max: 50 })
            .withMessage('Last name cannot exceed 50 characters.'),

        body('account_email')
            .trim()
            .notEmpty()
            .withMessage('Email is required.')
            .isEmail()
            .withMessage('Please provide a valid email address.'),

        body('account_password')
            .notEmpty()
            .withMessage('Password is required.')
            .isLength({ min: 8 })
            .withMessage('Password must be at least 8 characters long.')
    ],
    registerAccountController
)

/* ***************************
 * Login
 * *************************** */
router.get('/account/login', buildLogin)

router.post(
    '/account/login',
    [
        body('account_email')
            .trim()
            .notEmpty()
            .withMessage('Email is required.')
            .isEmail()
            .withMessage('Please provide a valid email address.'),

        body('account_password')
            .notEmpty()
            .withMessage('Password is required.')
    ],
    loginAccount
)

router.get('/account/logout', logoutAccount)

export default router