const mongoose=require('mongoose');

mongoose.connect('mongodb://localhost/codeial_development');

const db=mongoose.connection;

db.on('Error ',console.error.bind(console,"Error connecting to MongoDB"));

db.once('open',function(){
    console.log('Connect to DataBase :: MongoDB');
});

module.exports=db;