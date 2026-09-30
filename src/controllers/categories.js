import { validationResult } from 'express-validator';

import {
    getAllCategories,
    getCategoryById,
    getProjectsByCategoryId,
    createCategory,
    updateCategory
} from '../models/categories.js';

const buildCategories = async (req, res) => {
    const categories = await getAllCategories();

    res.render('categories', {
        title: 'Categories',
        categories
    });
};

const buildCategoryDetail = async (req, res) => {
    const categoryId = req.params.id;

    const category = await getCategoryById(categoryId);

    if (!category) {
        console.log('Category not found:', categoryId);

        return res.status(404).render('errors/404', {
            title: 'Page Not Found'
        });
    }

    const projects = await getProjectsByCategoryId(categoryId);

    res.render('category-detail', {
        title: category.name,
        category,
        projects
    });
};

const buildNewCategory = (req, res) => {
    res.render('new-category', {
        title: 'New Category'
    });
};

const createNewCategory = async (req, res) => {
    const errors = validationResult(req);

    const { name } = req.body;

    if (!errors.isEmpty()) {
        return res.status(400).render('new-category', {
            title: 'New Category',
            errors: errors.array(),
            name
        });
    }

    await createCategory(name.trim());

    req.flash('success', 'Category created successfully.');

    res.redirect('/categories');
};

const buildEditCategory = async (req, res) => {
    const categoryId = req.params.id;
    const category = await getCategoryById(categoryId);

    if (!category) {
        return res.status(404).render('errors/404', {
            title: 'Page Not Found'
        });
    }

    res.render('edit-category', {
        title: 'Edit Category',
        category
    });
};

const updateCategoryController = async (req, res) => {
    const errors = validationResult(req);
    const categoryId = req.params.id;
    const { name } = req.body;

    if (!errors.isEmpty()) {
        return res.status(400).render('edit-category', {
            title: 'Edit Category',
            errors: errors.array(),
            category: {
                category_id: categoryId,
                name
            }
        });
    }

    const updatedCategory = await updateCategory(
        categoryId,
        name.trim()
    );

    if (!updatedCategory) {
        return res.status(404).render('errors/404', {
            title: 'Page Not Found'
        });
    }

    req.flash('success', 'Category updated successfully.');

    res.redirect('/categories');
};

export {
    buildCategories,
    buildCategoryDetail,
    buildNewCategory,
    createNewCategory,
    buildEditCategory,
    updateCategoryController
};