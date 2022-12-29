module.exports = {
    isLoggedIn : function(req, res, next) {
        if(req.session.username){
            next();
        }else{
            req.flash("error", "Only logged users can post content");
            req.session.save(function(saveError){
                res.redirect('/login');
            });
        }
    }
}