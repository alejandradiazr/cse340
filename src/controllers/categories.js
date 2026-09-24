import {
    getAllCategories,
    getCategoryById,
    getProjectsByCategoryId
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

export {
    buildCategories,
    buildCategoryDetail
};