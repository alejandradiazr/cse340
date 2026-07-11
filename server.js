import express from 'express';

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


app.get('/organizations', (req, res) => {
    res.render('organizations', {
        title: 'Organizations'
    });
});


app.get('/projects', (req, res) => {
    res.render('projects', {
        title: 'Projects'
    });
});


app.get('/categories', (req, res) => {
    res.render('categories', {
        title: 'Categories'
    });
});


app.listen(PORT, () => {
    console.log(`Server is running at http://127.0.0.1:${PORT}`);
    console.log(`Environment: ${NODE_ENV}`);
});