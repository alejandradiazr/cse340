import {
    getAllProjects,
    getProjectById
} from '../models/projects.js';

import { getCategoriesByProjectId } from '../models/categories.js';

const buildProjects = async (req, res) => {
    const projects = await getAllProjects();

    res.render('projects', {
        title: 'Projects',
        projects
    });
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

    res.render('project-detail', {
        title: project.title,
        project,
        categories
    });
};

export {
    buildProjects,
    buildProjectDetail
}