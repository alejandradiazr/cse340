import pool from '../database/pool.js';

const addVolunteer = async (accountId, projectId) => {
    const query = `
        INSERT INTO volunteer (account_id, project_id)
        VALUES ($1, $2)
        ON CONFLICT (account_id, project_id) DO NOTHING;
    `;

    const result = await pool.query(query, [accountId, projectId]);

    return result.rowCount;
};

const removeVolunteer = async (accountId, projectId) => {
    const query = `
        DELETE FROM volunteer
        WHERE account_id = $1
        AND project_id = $2;
    `;

    const result = await pool.query(query, [accountId, projectId]);

    return result.rowCount;
};

const getProjectsByAccountId = async (accountId) => {
    const query = `
        SELECT
            p.project_id,
            p.title,
            p.description,
            p.location,
            p.date,
            o.name AS organization_name
        FROM volunteer AS v
        INNER JOIN project AS p
            ON v.project_id = p.project_id
        INNER JOIN organization AS o
            ON p.organization_id = o.organization_id
        WHERE v.account_id = $1
        ORDER BY p.date;
    `;

    const result = await pool.query(query, [accountId]);

    return result.rows;
};

const isVolunteer = async (accountId, projectId) => {
    const query = `
        SELECT *
        FROM volunteer
        WHERE account_id = $1
        AND project_id = $2;
    `;

    const result = await pool.query(query, [accountId, projectId]);

    return result.rows.length > 0;
};

export {
    addVolunteer,
    removeVolunteer,
    getProjectsByAccountId,
    isVolunteer
};