-- ========================================
-- W02 Database Setup
-- ========================================

-- ========================================
-- Organizations
-- ========================================

DROP TABLE IF EXISTS project_category;
DROP TABLE IF EXISTS project;
DROP TABLE IF EXISTS category;
DROP TABLE IF EXISTS organization;


CREATE TABLE organization (
    organization_id SERIAL PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    description TEXT NOT NULL,
    contact_email VARCHAR(255) NOT NULL,
    logo_filename VARCHAR(255) NOT NULL
);


-- ========================================
-- Insert Organizations
-- ========================================

INSERT INTO organization (
    name,
    description,
    contact_email,
    logo_filename
)
VALUES
(
    'BrightFuture Builders',
    'A nonprofit focused on improving community infrastructure through sustainable construction projects.',
    'info@brightfuturebuilders.org',
    'organization.webp'
),
(
    'GreenHarvest Growers',
    'An urban farming collective promoting food sustainability and education in local neighborhoods.',
    'contact@greenharvest.org',
    'plantingatree.webp'
),
(
    'UnityServe Volunteers',
    'A volunteer coordination group supporting local charities and service initiatives.',
    'hello@unityserve.org',
    'hero-volunteers.jpg'
);


-- ========================================
-- Projects
-- ========================================

CREATE TABLE project (
    project_id SERIAL PRIMARY KEY,
    organization_id INT NOT NULL,
    title VARCHAR(150) NOT NULL,
    description TEXT NOT NULL,
    location VARCHAR(150) NOT NULL,
    date DATE NOT NULL,

    CONSTRAINT fk_project_organization
        FOREIGN KEY (organization_id)
        REFERENCES organization (organization_id)
);


-- ========================================
-- Insert Projects
-- ========================================

INSERT INTO project (
    organization_id,
    title,
    description,
    location,
    date
)
VALUES

-- BrightFuture Builders
(
    1,
    'Neighborhood Cleanup',
    'Help clean parks, streets, and public spaces while working with local volunteers.',
    'Riverdale',
    '2026-09-15'
),
(
    1,
    'Community Garden Construction',
    'Help build garden spaces that provide fresh food and educational opportunities.',
    'Green Valley',
    '2026-09-20'
),
(
    1,
    'Accessible Playground Project',
    'Help improve a local playground so children of different abilities can enjoy it.',
    'Oakwood',
    '2026-09-25'
),
(
    1,
    'Community Center Renovation',
    'Assist with renovation projects that improve a community center for local families.',
    'Riverdale',
    '2026-10-03'
),
(
    1,
    'Public Park Improvement',
    'Work with volunteers to improve trails, benches, and public spaces in a local park.',
    'Green Valley',
    '2026-10-10'
),

-- GreenHarvest Growers
(
    2,
    'Urban Farming Workshop',
    'Teach community members basic gardening and sustainable farming techniques.',
    'Downtown',
    '2026-09-18'
),
(
    2,
    'Community Garden Planting',
    'Help plant vegetables and herbs in a shared community garden.',
    'Green Valley',
    '2026-09-22'
),
(
    2,
    'Food Donation Harvest',
    'Harvest fresh produce that will be donated to families in need.',
    'Eastside',
    '2026-09-28'
),
(
    2,
    'School Garden Program',
    'Help students learn about plants, food production, and environmental responsibility.',
    'Oakwood',
    '2026-10-05'
),
(
    2,
    'Neighborhood Composting Project',
    'Help residents learn how composting can reduce waste and support healthy gardens.',
    'Downtown',
    '2026-10-12'
),

-- UnityServe Volunteers
(
    3,
    'Food Drive',
    'Collect and organize food donations for local families and community organizations.',
    'Riverdale',
    '2026-09-17'
),
(
    3,
    'Tutoring Program',
    'Support students through tutoring and educational activities.',
    'Oakwood',
    '2026-09-24'
),
(
    3,
    'Senior Support Day',
    'Spend time helping older adults with basic household and community needs.',
    'Eastside',
    '2026-10-01'
),
(
    3,
    'Community Health Fair',
    'Help organize a community event focused on health education and wellness.',
    'Downtown',
    '2026-10-08'
),
(
    3,
    'Clothing Donation Event',
    'Collect, organize, and distribute clothing donations to people in need.',
    'Riverdale',
    '2026-10-15'
);


-- ========================================
-- Categories
-- ========================================

CREATE TABLE category (
    category_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE
);


-- ========================================
-- Insert Categories
-- ========================================

INSERT INTO category (name)
VALUES
    ('Environmental'),
    ('Educational'),
    ('Community Service'),
    ('Health and Wellness'),
    ('Food Assistance');


-- ========================================
-- Project / Category Relationship
-- Many-to-Many
-- ========================================

CREATE TABLE project_category (
    project_id INT NOT NULL,
    category_id INT NOT NULL,

    PRIMARY KEY (project_id, category_id),

    CONSTRAINT fk_project_category_project
        FOREIGN KEY (project_id)
        REFERENCES project (project_id)
        ON DELETE CASCADE,

    CONSTRAINT fk_project_category_category
        FOREIGN KEY (category_id)
        REFERENCES category (category_id)
        ON DELETE CASCADE
);


-- ========================================
-- Associate Projects with Categories
-- ========================================

INSERT INTO project_category (project_id, category_id)
VALUES

-- BrightFuture Builders
(1, 3),
(1, 1),

(2, 1),
(2, 3),

(3, 3),

(4, 3),

(5, 1),
(5, 3),

-- GreenHarvest Growers
(6, 2),
(6, 1),

(7, 1),
(7, 3),

(8, 5),
(8, 1),

(9, 2),
(9, 1),

(10, 1),
(10, 3),

-- UnityServe Volunteers
(11, 5),
(11, 3),

(12, 2),

(13, 3),

(14, 4),
(14, 3),

(15, 3);