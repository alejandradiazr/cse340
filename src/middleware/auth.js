/* ***************************
 * Require login
 * *************************** */
export function requireLogin(req, res, next) {
    if (req.session.account_id) {
        return next()
    }

    req.flash('notice', 'Please log in to access this page.')
    return res.redirect('/account/login')
}

/* ***************************
 * Require specific role
 * *************************** */
export function requireRole(role) {
    return (req, res, next) => {
        if (req.session.account_type === role) {
            return next()
        }

        req.flash('notice', 'You do not have permission to access this page.')
        return res.redirect('/')
    }
}