import bcrypt from 'bcrypt'
import { validationResult } from 'express-validator'
import { registerAccount, getAccountByEmail } from '../models/account.js'

/* ***************************
 * Build registration view
 * ************************** */
export function buildRegister(req, res) {
    res.render('account/register', {
        title: 'Register'
    })
}

/* ***************************
 * Register new account
 * ************************** */
export async function registerAccountController(req, res) {
    const { account_firstname, account_lastname, account_email, account_password } = req.body

    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        return res.render('account/register', {
            title: 'Register',
            errors: errors.array(),
            account_firstname,
            account_lastname,
            account_email
        })
    }

    try {
        const hashedPassword = await bcrypt.hash(account_password, 10)

        const account = await registerAccount(
            account_firstname,
            account_lastname,
            account_email,
            hashedPassword
        )

        if (account) {
            req.flash('notice', 'Registration successful. Please log in.')
            return res.redirect('/account/login')
        }

        req.flash('notice', 'Sorry, the registration failed.')
        return res.redirect('/account/register')

    } catch (error) {
        console.error('Registration error:', error)

        req.flash('notice', 'Sorry, there was an error processing your registration.')
        return res.redirect('/account/register')
    }
}

/* ***************************
 * Build login view
 * *************************** */
export function buildLogin(req, res) {
    res.render('account/login', {
        title: 'Login'
    })
}

/* ***************************
 * Process login
 * *************************** */
export async function loginAccount(req, res) {
    const { account_email, account_password } = req.body

    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        return res.render('account/login', {
            title: 'Login',
            errors: errors.array(),
            account_email
        })
    }

    try {
        const account = await getAccountByEmail(account_email)

        if (!account) {
            req.flash('notice', 'Sorry, we could not find that account.')
            return res.redirect('/account/login')
        }

        const passwordMatch = await bcrypt.compare(
            account_password,
            account.account_password
        )

        if (!passwordMatch) {
            req.flash('notice', 'Sorry, the password is incorrect.')
            return res.redirect('/account/login')
        }

        req.session.account_id = account.account_id
        req.session.account_firstname = account.account_firstname
        req.session.account_lastname = account.account_lastname
        req.session.account_email = account.account_email
        req.session.account_type = account.account_type

        req.flash('notice', `Welcome ${account.account_firstname}!`)
        return res.redirect('/')

    } catch (error) {
        console.error('Login error:', error)
        req.flash('notice', 'Sorry, there was an error processing your login.')
        return res.redirect('/account/login')
    }
}

export function logoutAccount(req, res) {
    req.session.destroy((error) => {
        if (error) {
            console.error('Logout error:', error)
            return res.redirect('/')
        }

        res.redirect('/')
    })
}