const express = require('express');
const router = express.Router();
const multer = require('multer');
const sharp = require('sharp');

const db = require('../conf/database');

const storage = multer.diskStorage({
    //where to store file
    destination: function (req, file, cb) {
      cb(null, 'public/images/uploads')
    },
    //change file of upload
    filename: function (req, file, cb) {
        let fileExt = file.mimetype.split('/')[1];
        cb(null, `${file.fieldname}-${Date.now()}-${Math.round(Math.random() * 1E9)}.${fileExt}`)
    }
  })
  
const upload = multer({ storage: storage })

router.post('/create', upload.single("img"), function(req, res, next){
    let uploadedFile = req.file.path;
    let thumbnailName = `thumbnail-${req.file.filename}`
    let destinationOfThumbnail = `${req.file.destination}/${thumbnailName}`
    const {title, description} = req.body
    const userId = req.session.userId

    sharp(uploadedFile)
    .resize(200)
    .toFile(destinationOfThumbnail)
    .then(function(){
        let baseSQL = `
        INSERT INTO posts (title, description, image, thumbnail, fk_authorId) VALUE (?,?,?,?,?)`
        return db.query(baseSQL, [title, description, uploadedFile, destinationOfThumbnail, userId])
    })
    .then(function([results, fields]){
        if(results && results.affectedRows){
            req.flash("success", "Your post has been created!")
            req.session.save(function(saveErr){
                res.redirect('/')
            })
        }
    })
    .catch(err => next(err))
})

router.get("/searchpost", function(req, res, next){
    let searchTerm = `%${req.query.searchTerm}%`;
    let originalSearchTerm = req.query.searchTerm;
    let baseSQL = `select 
    id, title, description, thumbnail, concat_ws(" ", title, description) as haystack
    from posts
    having haystack like ?;`;
    db.execute(baseSQL, [searchTerm])
        .then(function([results, fields]){
            if(results.length === 0){
                req.flash("error", `${results.length} results found, try again`);
                req.session.save(function(saveErr){
                    res.render('index');
                }); 
            }else{
            res.locals.results = results;
            res.locals.searchValue = originalSearchTerm;
            req.flash("success", `${results.length} results found`);
            req.session.save(function(saveErr){
                res.render('index'); 
            }); 
        }
    });
});

module.exports = router;