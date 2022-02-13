const express = require('express');
const multer = require('multer');
const morgan = require('morgan');
const path = require('path');
const exphbs = require('express-handlebars');

// Init
const app = express();
require('./database');

// Settings
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', exphbs.engine({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs',
}));
app.set('view engine', '.hbs');


// Middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded( {extended: false} ));
const storage = multer.diskStorage({
    destination:  path.join(__dirname, 'public/uploads'),
    filename: (req, file, callback) => {
        callback(null, new Date().getTime() + path.extname(file.originalname));
    },
});
app.use(multer({storage}).single('image'));


// Routes
app.use(require('./routes'));

module.exports = app;
