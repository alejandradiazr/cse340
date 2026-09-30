import pool from '../database/pool.js';

const getAllCategories = async () => {
    const query = `
        SELECT
            category_id,
            name
        FROM category
        ORDER BY name;
    `;

    const result = await pool.query(query);

    return result.rows;
};

const getCategoryById = async (categoryId) => {
    const query = `
        SELECT
            category_id,
            name
        FROM category
        WHERE category_id = $1;
    `;

    const result = await pool.query(query, [categoryId]);

    return result.rows[0];
};

const getProjectsByCategoryId = async (categoryId) => {
    const query = `
        SELECT
            p.project_id,
            p.title,
            p.description,
            p.location,
            p.date
        FROM project AS p
        INNER JOIN project_category AS pc
            ON p.project_id = pc.project_id
        WHERE pc.category_id = $1
        ORDER BY p.date;
    `;

    const result = await pool.query(query, [categoryId]);

    return result.rows;
};

const getCategoriesByProjectId = async (projectId) => {
    const query = `
        SELECT
            c.category_id,
            c.name
        FROM category AS c
        INNER JOIN project_category AS pc
            ON c.category_id = pc.category_id
        WHERE pc.project_id = $1
        ORDER BY c.name;
    `;

    const result = await pool.query(query, [projectId]);

    return result.rows;
};

const createCategory = async (name) => {
    const query = `
        INSERT INTO category (name)
        VALUES ($1)
        RETURNING *;
    `;

    const result = await pool.query(query, [name]);

    return result.rows[0];
};

const updateCategory = async (categoryId, name) => {
    const query = `
        UPDATE category
        SET name = $1
        WHERE category_id = $2
        RETURNING *;
    `;

    const result = await pool.query(query, [name, categoryId]);

    return result.rows[0];
};

const updateProjectCategories = async (projectId, categoryIds) => {
    const client = await pool.connect();

    try {
        await client.query('BEGIN');

        await client.query(
            'DELETE FROM project_category WHERE project_id = $1',
            [projectId]
        );

        for (const categoryId of categoryIds) {
            await client.query(
                `INSERT INTO project_category (project_id, category_id)
                 VALUES ($1, $2)`,
                [projectId, categoryId]
            );
        }

        await client.query('COMMIT');
    } catch (error) {
        await client.query('ROLLBACK');
        throw error;
    } finally {
        client.release();
    }
};

export {
    getAllCategories,
    getCategoryById,
    getProjectsByCategoryId,
    getCategoriesByProjectId,
    createCategory,
    updateCategory,
    updateProjectCategories
};