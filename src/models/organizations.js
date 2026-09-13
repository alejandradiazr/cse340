import pool from '../database/pool.js';

const getAllOrganizations = async () => {
    const query = `
        SELECT
            organization_id,
            name,
            description,
            contact_email,
            logo_filename
        FROM organization
        ORDER BY name;
    `;

    const result = await pool.query(query);

    return result.rows;
};

export { getAllOrganizations };