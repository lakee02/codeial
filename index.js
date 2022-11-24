const express=require('express');
const cookieParse=require('cookie-parser');
const router = require('./routes');
const app=express();
const port=8000;
const expressLayouts=require('express-ejs-layouts');
const db=require('./config/mongoose');

app.use(express.urlencoded());
app.use(cookieParse());

app.use(express.static('./assets'));

app.use(expressLayouts);
//extract style and script from sub pages intoo the layouts 
app.set('layout extractStyles ',true);
app.set('layout extractScripts ',true);

//use express router
app.use('/',require('./routes'));

//set up view engine
app.set('view engine','ejs');
app.set('views','./views');

app.listen(port,function(err){
    if(err){
        // console.log('Error :',err);
        console.log(`Error in runnig the server : ${err}`);
        return;
    }
    console.log(`server is running on port : ${port}`);
})