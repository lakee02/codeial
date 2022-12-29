const passport=require('passport');
const user = require('../models/user');

const localStrategy=require('passport-local').Strategy;
const User=require('../models/user');

// Authentication using passport
passport.use(new localStrategy({
    usernameField:'email'
    },
    function(email,password,done){
        //find a user and establish the identity
        User.findOne({email: email},function(err,user){
            if(err){
                console.log('Eroor in Finding --> Passport');
                return done(err);
            }
            if(!user || user.password !=password){
                console.log('Invalid Username/password');
                return done(null,false);
            }
            return done(null,true);
        })
    }
));

// serializzing the user to decide which key is to be kept in the cookies
passport.serializeUser(function(user,done){
    done(null,user.id);
});

// deserializzing the user from the key in the cookies
passport.deserializeUser(function(id,done){
    User.findById(id,function(err,user){
        if(err){
            console.log('Error in Finding user --> Passport');
            return done(err);
        }
        return done(null,user);
    })
});

//check if the user is authenticated
passport.checkAuthentication=function(req,res,next){
    // if the user is sign in, then pass on the request to the next function(controller's action)
    if(req.isAuthenticated()){
        return next();
    }
    // if the user not sign in
    return res.redirect('/users/sign-in')
}

module.exports=passport;