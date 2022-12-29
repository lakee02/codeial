const mongoose=require('mongoose');
const postSchema=new mongoose.Schema({
    context : {
        type : String,
        require : true
    },
    user : {
        type: mongoose.Schema.Types.ObjectId,
        ref :'user'
    }
},{
    timestamps: true
});

const post=mongoose.model('post',postSchema);
module.exports=post;