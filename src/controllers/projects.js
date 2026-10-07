import { validationResult } from 'express-validator';

import {
    getAllProjects,
    getProjectById,
    createProject,
    updateProject
} from '../models/projects.js';

import {
    getAllCategories,
    getCategoriesByProjectId,
    updateProjectCategories
} from '../models/categories.js';

import {
    getAllOrganizations
} from '../models/organizations.js';

import {
    addVolunteer,
    removeVolunteer,
    isVolunteer
} from '../models/volunteers.js';

const buildProjects = async (req, res) => {

    const projects = await getAllProjects();

    res.render('projects', {
        title: 'Projects',
        projects
    });
};

const buildNewProject = async (req, res) => {

    const organizations = await getAllOrganizations();

    res.render('new-project', {
        title: 'New Project',
        organizations
    });

};

const createNewProject = async (req, res) => {

    const errors = validationResult(req);

    const {
        organization_id,
        title,
        description,
        location,
        date
    } = req.body;

    if (!errors.isEmpty()) {
        const organizations = await getAllOrganizations();

        return res.status(400).render('new-project', {
            title: 'New Project',
            errors: errors.array(),
            organizations,
            organizationId: organization_id,
            title,
            description,
            location,
            date
        });
    }

    await createProject(
        organization_id,
        title.trim(),
        description.trim(),
        location.trim(),
        date
    );

    req.flash('success', 'Project created successfully.');

    res.redirect('/projects');
};

const buildEditProject = async (req, res) => {

    const projectId = req.params.id;

    const project = await getProjectById(projectId);

    if (!project) {
        return res.status(404).render('errors/404', {
            title: 'Page Not Found'
        });
    }

    const organizations = await getAllOrganizations();

    res.render('edit-project', {
        title: 'Edit Project',
        project,
        organizations
    });
};

const updateProjectController = async (req, res) => {

    const errors = validationResult(req);

    const projectId = req.params.id;

    const {
        organization_id,
        title,
        description,
        location,
        date
    } = req.body;

    if (!errors.isEmpty()) {
        const organizations = await getAllOrganizations();

        return res.status(400).render('edit-project', {
            title: 'Edit Project',
            errors: errors.array(),
            organizations,
            project: {
                project_id: projectId,
                organization_id,
                title,
                description,
                location,
                date
            }
        });
    }

    const updatedProject = await updateProject(
        projectId,
        organization_id,
        title.trim(),
        description.trim(),
        location.trim(),
        date
    );

    if (!updatedProject) {
        return res.status(404).render('errors/404', {
            title: 'Page Not Found'
        });
    }

    req.flash('success', 'Project updated successfully.');

    res.redirect('/projects');
};

const buildProjectDetail = async (req, res) => {
    const projectId = req.params.id;

    const project = await getProjectById(projectId);

    if (!project) {
        return res.status(404).render('errors/404', {
            title: 'Page Not Found'
        });
    }

    const categories = await getCategoriesByProjectId(projectId);

    let volunteerStatus = false;

    if (req.session.account_id) {
        volunteerStatus = await isVolunteer(
            req.session.account_id,
            projectId
        );
    }

    res.render('project-detail', {
        title: project.title,
        project,
        categories,
        volunteerStatus
    });
};

const addProjectVolunteer = async (req, res) => {
    const projectId = req.params.id;
    const accountId = req.session.account_id;

    const project = await getProjectById(projectId);

    if (!project) {
        return res.status(404).render('errors/404', {
            title: 'Page Not Found'
        });
    }

    await addVolunteer(accountId, projectId);

    req.flash(
        'success',
        'You are now volunteering for this project.'
    );

    res.redirect(`/project/${projectId}`);
};

const removeProjectVolunteer = async (req, res) => {
    const projectId = req.params.id;
    const accountId = req.session.account_id;

    const project = await getProjectById(projectId);

    if (!project) {
        return res.status(404).render('errors/404', {
            title: 'Page Not Found'
        });
    }

    await removeVolunteer(accountId, projectId);

    req.flash(
        'success',
        'You are no longer volunteering for this project.'
    );

    res.redirect(`/project/${projectId}`);
};

const buildProjectCategories = async (req, res) => {

    const projectId = req.params.id;

    const project = await getProjectById(projectId);

    if (!project) {
        return res.status(404).render('errors/404', {
            title: 'Page Not Found'
        });
    }

    const categories = await getAllCategories();

    const projectCategories = await getCategoriesByProjectId(projectId);

    const selectedCategoryIds = projectCategories.map(
        category => category.category_id
    );

    res.render('project-categories', {
        title: 'Update Categories',
        project,
        categories,
        selectedCategoryIds
    });
};

const updateProjectCategoriesController = async (req, res) => {

    const projectId = req.params.id;

    let categoryIds = req.body.category_ids || [];

    if (!Array.isArray(categoryIds)) {
        categoryIds = [categoryIds];
    }

    await updateProjectCategories(projectId, categoryIds);

    req.flash(
        'success',
        'Project categories updated successfully.'
    );

    res.redirect(`/project/${projectId}`);
};

export {
    buildProjects,
    buildNewProject,
    createNewProject,
    buildEditProject,
    updateProjectController,
    buildProjectDetail,
    addProjectVolunteer,
    removeProjectVolunteer,
    buildProjectCategories,
    updateProjectCategoriesController
};