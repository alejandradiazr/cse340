import {
    getAllOrganizations,
    getOrganizationById,
    getProjectsByOrganizationId
} from '../models/organizations.js';

const buildOrganizations = async (req, res) => {
    const organizations = await getAllOrganizations();

    res.render('organizations', {
        title: 'Organizations',
        organizations
    });
};

const buildOrganizationDetail = async (req, res) => {
    const organizationId = req.params.id;

    const organization = await getOrganizationById(organizationId);

    if (!organization) {
        return res.status(404).render('errors/404', {
            title: 'Page Not Found'
        });
    }

    const projects = await getProjectsByOrganizationId(organizationId);

    res.render('organization-detail', {
        title: organization.name,
        organization,
        projects
    });
};

export {
    buildOrganizations,
    buildOrganizationDetail
};