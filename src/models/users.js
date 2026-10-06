import pool from '../database/pool.js'

/* ***************************
 * Get all users
 * *************************** */
export async function getAllUsers() {
    const { rows } = await pool.query(
        `SELECT
            account_id,
            account_firstname,
            account_lastname,
            account_email,
            account_type
         FROM account
         ORDER BY account_lastname, account_firstname`
    )

    return rows
}