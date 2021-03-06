const express = require('express');
const appExpress = express();
const session = require('express-session')
const flash = require('express-flash');
// const pg = require('pg');
const pool = require('./server/database');
// const greetLangRadio = require("./greet");
const helperfunction = require('./helper/helper');
// const helperRoute = require('./route/route')
const exphbs  = require('express-handlebars');
const handlebarSetup = exphbs({
    partialsDir: "./views/partials",
    viewPath:  './views',
    layoutsDir : './views/layouts'
});

var bodyParser = require('body-parser');


let helper = helperfunction(pool);
// let route = helperRoute();

appExpress.engine('handlebars', exphbs({defaultLayout: 'main'}));
appExpress.set('view engine', 'handlebars');

appExpress.engine('handlebars', handlebarSetup);
appExpress.set('view engine', 'handlebars');

appExpress.engine('handlebars', exphbs({defaultLayout: 'main', layoutsDir:__dirname + '/views/layouts'}));
appExpress.set('view engine', 'handlebars');

// medleware

appExpress.use(express.static('public'));
// appExpress.use(cros());
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

appExpress.get('/', async (reqHtml , resHtml) => {
    // console.log(await helper.CounterDB());
    resHtml.render('index', {
        title : 'home',
        counter : helper.allValues().counter,
        greeting : helper.allValues().Array1,
    });
});

appExpress.post("/greeted", helper.errorMsg);

appExpress.get("/reset", async (reqHtml , resHtml) => {
    reqHtml.flash('success', helper.allValues().succeful);
    resHtml.render('index', {
        error :helper.resetBtn(),
        counter :await helper.CounterDB()
    });
});

appExpress.get("/list", (reqHtml , resHtml) => {
    resHtml.render('greetedNames', {
        names : helper.allValues().nameList
    });
});

appExpress.get('/counter', (reqHtml, resHtml)=>{
    resHtml.render('counter');
});

appExpress.get('/counter/:Usernames', (reqHtml, resHtml)=>{
    const Usernames = reqHtml.params.Usernames
    const results = helper.ourClient(Usernames);
    resHtml.render('counter', {
        ...results
        
    });
});


const PORT = process.env.PORT || 3012
appExpress.listen(PORT)