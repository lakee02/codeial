const express=require('express');
const router=express.Router();
const passport =require('passport');

const usersControllers=require('../controllers/users_controller');

router.get('/profile',usersControllers.profile);
router.get('/sign-up',usersControllers.signUp);
router.get('/sign-in',usersControllers.signIn);

router.post('/create',usersControllers.create);

// use passport as a middleware to authenticate
router.post('/create-session',passport.authenticate(
    'local',
    {failureRedirect:'/users/sign-in'},
),usersControllers.createSession);


module.exports=router;