import express from 'express';
import { getAllOrganizations } from './src/models/organizations.js';
import { getAllProjects } from './src/models/projects.js';
import { getAllCategories } from './src/models/categories.js';

const NODE_ENV = process.env.NODE_ENV?.toLowerCase() || 'production';
const PORT = process.env.PORT || 3000;

const app = express();


app.use(express.static('public'));


app.set('view engine', 'ejs');
app.set('views', './views');


app.get('/', (req, res) => {
    res.render('home', {
        title: 'Home'
    });
});


app.get('/organizations', async (req, res) => {
    const organizations = await getAllOrganizations();

    res.render('organizations', {
        title: 'Organizations',
        organizations
    });
});

app.get('/projects', async (req, res) => {
    const projects = await getAllProjects();

    res.render('projects', {
        title: 'Projects',
        projects
    });
});


app.get('/categories', async (req, res) => {
    const categories = await getAllCategories();

    res.render('categories', {
        title: 'Categories',
        categories
    });
});

app.listen(PORT, () => {
    console.log(`Server is running at http://127.0.0.1:${PORT}`);
    console.log(`Environment: ${NODE_ENV}`);
});