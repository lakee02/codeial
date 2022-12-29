const express=require('express');
const cookieParse=require('cookie-parser');
const router = require('./routes');
const app=express();
const port=8000;
const expressLayouts=require('express-ejs-layouts');
const db=require('./config/mongoose');
// Used for session cookie
const session=require('express-session');
const passport=require('passport');
const passportLocal=require('./config/passport-local-strategy');

const sassMiddleware=require('node-sass-middleware');

app.use(sassMiddleware({
    src : './assets/scss',
    dest : './assets/css',
    debug : true,
    outputStyle : 'extended',
    prefix :'/css'
}));
app.use(express.urlencoded());
app.use(cookieParse());

app.use(express.static('./assets'));

app.use(expressLayouts);
//extract style and script from sub pages intoo the layouts 
app.set('layout extractStyles ',true);
app.set('layout extractScripts ',true);





app.use(session({
    name:'codeial',
    // TODO change the secret before deployment in production mode
    secret:'blahsomething',
    saveUninitialized:false,
    resave:false,
    cookie:{
        maxAge: (1000*60*100)
    }
}));

//set up view engine
app.set('view engine','ejs');
app.set('views','./views');

app.use(passport.initialize());
app.use(passport.session());

//use express router
app.use('/',require('./routes'));

app.listen(port,function(err){
    if(err){
        // console.log('Error :',err);
        console.log(`Error in runnig the server : ${err}`);
        return;
    }
    console.log(`server is running on port : ${port}`);
})