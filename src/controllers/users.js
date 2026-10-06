import { getAllUsers } from '../models/users.js'

/* ***************************
 * Build users view
 * *************************** */
export async function buildUsers(req, res) {
    try {
        const users = await getAllUsers()

        res.render('users', {
            title: 'Users',
            users
        })
    } catch (error) {
        console.error('Error getting users:', error)
        res.status(500).render('errors/500', {
            title: 'Server Error'
        })
    }
}