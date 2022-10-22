const express=require('express');
const router = require('./routes');
const app=express();
const port=8000;

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