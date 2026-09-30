import pool from '../database/pool.js';

const getAllProjects = async () => {
    const query = `
        SELECT
            p.project_id,
            p.organization_id,
            p.title,
            p.description,
            p.location,
            p.date,
            o.name AS organization_name
        FROM project AS p
        INNER JOIN organization AS o
            ON p.organization_id = o.organization_id
        WHERE p.date >= CURRENT_DATE
        ORDER BY p.date
        LIMIT 5;
    `;

    const result = await pool.query(query);

    return result.rows;
};

const getProjectById = async (projectId) => {
    const query = `
        SELECT
            p.project_id,
            p.organization_id,
            p.title,
            p.description,
            p.location,
            p.date,
            o.name AS organization_name
        FROM project AS p
        INNER JOIN organization AS o
            ON p.organization_id = o.organization_id
        WHERE p.project_id = $1;
    `;

    const result = await pool.query(query, [projectId]);

    return result.rows[0];
};

const createProject = async (
    organizationId,
    title,
    description,
    location,
    date
) => {
    const query = `
        INSERT INTO project (
            organization_id,
            title,
            description,
            location,
            date
        )
        VALUES ($1, $2, $3, $4, $5)
        RETURNING *;
    `;

    const result = await pool.query(query, [
        organizationId,
        title,
        description,
        location,
        date
    ]);

    return result.rows[0];
};

const updateProject = async (
    projectId,
    organizationId,
    title,
    description,
    location,
    date
) => {
    const query = `
        UPDATE project
        SET
            organization_id = $1,
            title = $2,
            description = $3,
            location = $4,
            date = $5
        WHERE project_id = $6
        RETURNING *;
    `;

    const result = await pool.query(query, [
        organizationId,
        title,
        description,
        location,
        date,
        projectId
    ]);

    return result.rows[0];
};

export {
    getAllProjects,
    getProjectById,
    createProject,
    updateProject
};