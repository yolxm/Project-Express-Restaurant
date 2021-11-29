const multer = require("multer");

function uploadImage(info){
    const storage = multer.diskStorage({
        destination: `./public/images/${info}`,
 
        filename: function (req, file, cb) {
            console.log(file);
          cb(null, Date.now() + '-' + file.originalname) 
        },
      });
    
      const upload = multer({ storage: storage }).single("image");
                               
    return upload;
}

module.exports = uploadImage;
