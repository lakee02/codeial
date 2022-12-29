const { request } = require('express');
const user = require('../models/user');
const User=require('../models/user');

module.exports.profile=function(req,res){
    //  return res.end('<h1>User profile</h1>');
    if(req.cookies.user_id){
        User.findById(req.cookies.user_id,function(err,user){
            if(user){
                return res.render('user_profile',{
                    title:"User Profile",
                    user:user
                })
            }else{
                return res.redirect('/users/sign-in');
            }
        })
    }else{
        return res.redirect('/users/sign-in');
    }

    //  return res.render('user_profie',{
    //     title:'user profile'

    //  })
}

// render the sign up page
module.exports.signUp=function(req,res){
    return res.render('user_sign_up',{
        title:"Sign Up"
    })
}


// render the sign in page
module.exports.signIn=function(req,res){
    return res.render('user_sign_In',{
        title:"Codeial | Sign In"
    })
}

// get the sign up data
module.exports.create=function(req,res){
    if(req.body.password!=req.body.Confirm_Password){
        return res.redirect('back');
    }
    User.findOne({email: req.body.email},function(err,user){
        if(err){
            console.log('error in finding user in signup');
            return;
        }
        console.log(req.body)
        if(!user){
            User.create(req.body,function(err,user){
                if(err){
                    console.log('error in creating user while signing up');
                    return;
                }
                console.log("user created succesfully");
                return res.redirect('/users/sign-in');
            })
        }else{
            return res.redirect('back');
        }
    })
}

// sign and create a session
module.exports.createSession=function(req,res){
    //find the user
    User.findOne({email:req.body.email},function(err,user){
        if(err){
            console.log('error Account does not exists');
            return;
        }
        if(user){
            //if user is found
            User.findOne({password:req.body.password},function(err,user){
                // if(err){
                //     console.log('error incorrect password');
                //     return;
                // }
                //if password is incorrecrt
                if(user.password!=req.body.password){
                    return res.redirect('back');
                }
                //handle session creation
                res.cookie('user_id',user.id);
                return res.redirect('/users/profile');
            })
        }
        else{
            //if user not found
            return res.redirect('back');
        }
        
    })
}

//sign in and create session for the user 
module.exports.createSession=function(req,res){
    return res.redirect('/')
}