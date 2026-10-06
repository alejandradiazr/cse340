import express from 'express';
import session from 'express-session';
import flash from 'connect-flash';

import organizationRoutes from './src/routes/organizations.js';
import projectRoutes from './src/routes/projects.js';
import categoryRoutes from './src/routes/categories.js';
import accountRoutes from './src/routes/account.js';
import userRoutes from './src/routes/users.js';
import dashboardRoutes from './src/routes/dashboard.js';

const NODE_ENV = process.env.NODE_ENV?.toLowerCase() || 'production';

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

app.set('view engine', 'ejs');

app.set('views', './views');

app.use(
    session({
        secret: 'cse340-secret',
        resave: false,
        saveUninitialized: true
    })
);

app.use(flash());

app.use((req, res, next) => {
    res.locals.messages = req.flash();
    res.locals.account_id = req.session.account_id;
    res.locals.account_type = req.session.account_type;
    next();
});

app.use(organizationRoutes);
app.use(projectRoutes);
app.use(categoryRoutes);
app.use(accountRoutes);
app.use(userRoutes);
app.use(dashboardRoutes);

app.get('/', (req, res) => {
    res.render('home', {
        title: 'Home'
    });
});

app.use((req, res) => {
    res.status(404).render('errors/404', {
        title: 'Page Not Found'
    });
});

app.use((err, req, res, next) => {
    console.error(err);

    res.status(500).render('errors/500', {
        title: 'Server Error'
    });
});

app.listen(PORT, () => {
    console.log(`Server is running at http://127.0.0.1:${PORT}`);
    console.log(`Environment: ${NODE_ENV}`);
});