// indlæs express
const express = require('express');
const app = express();

// knyt morgan til som logger
const logger = require('morgan');
app.use(logger('dev'));

const session = require('express-session')
app.use(session({
    secret: 'rseztxrdycfugviubhilnjækm567887934',
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 1000 * 60 * 30,
        secure: false
    }
}));

// sæt view-engine op til at benytte ejs
app.set('view engine', 'ejs'); // definer template engine
app.set('views', './server/views'); // definerer hvor ejs filerne er placeret
app.engine('ejs', require('express-ejs-extend')); // tillad extends i ejs templates


// konfigurer bodyparser
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

//Her reguire vi et modul, som skal benyttes til at håndtere filuploads
const fileupload = require('express-fileupload');
//Her bestemmes hvor store filerne må være
app.use(fileupload({
    limits: {
        fileSize: 10 * 1024 * 1024
    }//det svarer til 10mb
}));

// app.get('/admin/*', (req, res, next) => {
//     if (req.session.user_id == undefined) {
//         res.redirect('/login');
//     } else {
//         next();
//     }
// })

// app.post('/admin/*', (req, res, next) => {
//     if (req.session.user_id == undefined) {
//         res.redirect('/login');
//     } else {
//         next();
//     }
// })

require('./routes/forside.js')(app);
require('./routes/produkter.js')(app);
require('./routes/bruger.js')(app);
require('./routes/admin.js')(app);


app.use(express.static('public'));
// start serveren på en port
const port = 3000;
app.listen(port, (err) => {
    if (err) {
        console.log(err);
    }
    console.log('App is listening on http://localhost:' + port);
});