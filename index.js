const express = require('express');
const appExpress = express();
const session = require('express-session')
const flash = require('express-flash');
const greetLangRadio = require("./greet");
const helperfunction = require('./helper/helper');
const exphbs  = require('express-handlebars');
const handlebarSetup = exphbs({
    partialsDir: "./views/partials",
    viewPath:  './views',
    layoutsDir : './views/layouts'
});
var bodyParser = require('body-parser');

appExpress.use(express.static('public'));

let helper = helperfunction();

appExpress.engine('handlebars', exphbs({defaultLayout: 'main'}));
appExpress.set('view engine', 'handlebars');

appExpress.engine('handlebars', handlebarSetup);
appExpress.set('view engine', 'handlebars');

appExpress.engine('handlebars', exphbs({defaultLayout: 'main', layoutsDir:__dirname + '/views/layouts'}));
appExpress.set('view engine', 'handlebars');

// parse appExpresslication/x-www-form-urlencoded
appExpress.use(bodyParser.urlencoded({ extended: false }))
// parse appExpresslication/json
appExpress.use(bodyParser.json())

appExpress.use(express.urlencoded({extended: false}));

appExpress.use(session({
    secret : "Error Message String",
    resave: false,
    saveUninitialized: true
}));

appExpress.use(flash());

appExpress.get('/', (reqHtml , resHtml) => {
    reqHtml.flash('error', helper.allValues().Array2);
    reqHtml.flash('success', helper.allValues().succeful);
    resHtml.render('index', {
        title : 'home',
        counter : helper.allValues().counter,
        greeting : helper.allValues().Array1,
    })

})

appExpress.post("/greeted", (reqHtml , resHtml) => {
    helper.langCompler(reqHtml.body.Names , reqHtml.body.languageRadio);
    resHtml.redirect('/');
})

appExpress.get("/reset", (reqHtml , resHtml) => {
    helper.resetBtn();
    resHtml.redirect('/');
})



appExpress.listen(3012);