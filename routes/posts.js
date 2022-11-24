const express=require('express');

const router=express.Router();

const postControllers=require('../controllers/post_controllers');

router.get('/post',postControllers.post);

module.exports=router;