import { validationResult } from 'express-validator';

import {
    getAllOrganizations,
    getOrganizationById,
    getProjectsByOrganizationId,
    createOrganization,
    updateOrganization
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

const buildNewOrganization = (req, res) => {
    res.render('new-organization', {
        title: 'New Organization'
    });
};

const createNewOrganization = async (req, res) => {
    const errors = validationResult(req);

    const {
        name,
        description,
        contact_email,
        logo_filename
    } = req.body;

    if (!errors.isEmpty()) {
        return res.status(400).render('new-organization', {
            title: 'New Organization',
            errors: errors.array(),
            name,
            description,
            contactEmail: contact_email,
            logoFilename: logo_filename
        });
    }

    await createOrganization(
        name.trim(),
        description.trim(),
        contact_email.trim(),
        logo_filename ? logo_filename.trim() : ''
    );

    req.flash('success', 'Organization created successfully.');

    res.redirect('/organizations');
};

const buildEditOrganization = async (req, res) => {
    const organizationId = req.params.id;

    const organization = await getOrganizationById(organizationId);

    if (!organization) {
        return res.status(404).render('errors/404', {
            title: 'Page Not Found'
        });
    }

    res.render('edit-organization', {
        title: 'Edit Organization',
        organization
    });
};

const updateOrganizationController = async (req, res) => {
    const errors = validationResult(req);

    const organizationId = req.params.id;

    const {
        name,
        description,
        contact_email,
        logo_filename
    } = req.body;

    if (!errors.isEmpty()) {
        return res.status(400).render('edit-organization', {
            title: 'Edit Organization',
            errors: errors.array(),
            organization: {
                organization_id: organizationId,
                name,
                description,
                contact_email,
                logo_filename
            }
        });
    }

    const updatedOrganization = await updateOrganization(
        organizationId,
        name.trim(),
        description.trim(),
        contact_email.trim(),
        logo_filename ? logo_filename.trim() : ''
    );

    if (!updatedOrganization) {
        return res.status(404).render('errors/404', {
            title: 'Page Not Found'
        });
    }

    req.flash('success', 'Organization updated successfully.');

    res.redirect('/organizations');
};

export {
    buildOrganizations,
    buildOrganizationDetail,
    buildNewOrganization,
    createNewOrganization,
    buildEditOrganization,
    updateOrganizationController
};