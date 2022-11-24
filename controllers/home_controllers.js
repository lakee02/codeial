module.exports.home = function(req,res){
    
    return res.render('home',{
        title:"Home"
    })

    // return res.end('<h1>Express is Up for codeial!</h1>')
}
// module.exports.actionName=function(req,res){}