const express = require('express');
const app = express();
const greetLangRadio = require("./greet")
const exphbs  = require('express-handlebars');
const handlebarSetup = exphbs({
    partialsDir: "./views/partials",
    viewPath:  './views',
    layoutsDir : './views/layouts'
});

app.use(express.static('public'));


app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.engine('handlebars', handlebarSetup);
app.set('view engine', 'handlebars');

app.engine('handlebars', exphbs({defaultLayout: 'main', layoutsDir:__dirname + '/views/layouts'}));
app.set('view engine', 'handlebars');

// parse application/x-www-form-urlencoded
// app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
// app.use(bodyParser.json())

// app.use(express.urlencoded({extended: false}));



app.get('/', (req, res) => {
    res.render('index')
})

app.get('/greeted', (req, res) => {
    res.send("thanks for greeting this name.")
});

app.post('/greeting', (req, res) => {

    res.send("thanks for greeting this name.")
});

app.get("/results", (req, res) => {
    res.send("please enter a correct name!")
})

app.listen(3012);