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
    resHtml.render('index', {
        title : 'home',
        counter : helper.allValues().counter,
        greeting : helper.allValues().Array1,
    });
});

appExpress.post("/greeted", (reqHtml , resHtml) => {
    if(reqHtml.body.Names==="" && reqHtml.body.languageRadio===undefined){
        reqHtml.flash('info', "Please enter a name and Select a language!");
    } else if(reqHtml.body.languageRadio===undefined){
        reqHtml.flash('info', "Plaese select a language!");
    } else if(reqHtml.body.Names===""){
        reqHtml.flash('info', "Plaese enter a name!");
    }else if(!/^[a-zA-Z]+$/.test(reqHtml.body.Names)){
        reqHtml.flash('info', "Plaese enter a valid name!");
    } else {
       helper.langCompler(reqHtml.body.Names , reqHtml.body.languageRadio);
    }
    resHtml.render('index', {
        counter :helper.getCounter(),
        greeting : helper.allValues().Array1,

    });
});

appExpress.get("/reset", (reqHtml , resHtml) => {
    reqHtml.flash('success', helper.allValues().succeful);
    resHtml.render('index', {
        error :helper.resetBtn(),
        counter :helper.getCounter()
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
appExpress.listen(PORT);