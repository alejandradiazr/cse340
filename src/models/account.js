import pool from '../database/pool.js'

/* ***************************
 * Get account by email
 * ************************** */
export async function getAccountByEmail(account_email) {
    const { rows } = await pool.query(
        `SELECT *
         FROM account
         WHERE account_email = $1`,
        [account_email]
    )
    return rows[0]
}

/* ***************************
 * Create a new account
 * ************************** */
export async function registerAccount(
    account_firstname,
    account_lastname,
    account_email,
    account_password,
    account_type = 'user'
) {
    const { rows } = await pool.query(
        `INSERT INTO account
            (account_firstname, account_lastname, account_email, account_password, account_type)
         VALUES ($1, $2, $3, $4, $5)
         RETURNING *`,
        [
            account_firstname,
            account_lastname,
            account_email,
            account_password,
            account_type
        ]
    )
    return rows[0]
}