const express=require('express');

const router=express.Router();
const homeController=require('../controllers/home_controllers');

console.log('Routes loded');

router.get('/',homeController.home);
router.use('/users',require('./users'));
router.use('/post',require('./posts'));

//for any further routes, access from here 
// router.use('/routerName',require(./routerFile'));

module.exports=router;