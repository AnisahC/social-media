const db = require('../conf/database')
module.exports = {
    getRecentPosts: function(req, res, next){
        db.query('select id, title, description, thumbnail from posts ORDER BY createdAt DESC LIMIT 8')
        .then(function([results, fields]){
            if(results && results.length){
                res.locals.results = results;
            }
            next();
        }).catch(err => next(err));
    },

    getPostById: function(req, res, next) {
        let postId = req.params.id;
        let baseSQL = `select p.id, p.title, p.description, p.image, p.createdAt, u.username
        from posts p
        join users u
        on p.fk_authorId=u.id
        where p.id=?;` 
        db.query(baseSQL, postId)
            .then(function([results, fields]){
                if(results && results.length == 1){
                    res.locals.currentPosts = results[0];
                }
                next();
            })
    },
    getCommentsForPostsById: function(req, res, next) {
        let postId = req.params.id;
        let baseSQL = `select c.id, c.text, c.createdAt, u.username
        from comments c
        join users u
        on c.fk_authorId=u.id
        where fk_postId = ?;`
        db.execute(baseSQL, [postId])
            .then(function([results, fields]){
                res.locals.currentPosts.comments = results;
                next();
            }).catch(err => next(err))
    }
};