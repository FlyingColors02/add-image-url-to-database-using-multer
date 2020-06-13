let express = require("express");
let router = express.Router();
let multer = require("multer");
let imgport = "http://localhost:4500";
let model = require("../db/fileuploads");

let storage = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null,"./uploads/");
    },
    filename: function(req,file,cb){
        cb(null,file.originalname)
    }
});

let filefilter = (req,file,cb)=>{
    if(file.mimetype==="image/jpg"|| file.mimetype==="image/png"|| file.mimetype==="image/mp4"||file.mimetype==="image/jpeg"
    ||file.mimetype==="image/mp3"){
        cb(null,true);
    }
    else{
        cb(null,false);
    }
}

let upload = multer({
    storage : storage,
    limits:{
        fileSize:1024*1024*5
    },
    fileFilter:filefilter
});

router.post("/upload",upload.single("image"),async (req,res)=>{
    try{

        let filedata = new model({
            image:imgport+"/uploads/"+req.file.filename
        })
        if(!filedata){return res.status(403).send({message:"not found"})};
        let data=await filedata.save();
        res.send({message:"file uploaded",data:data})
    }catch(ex){
        res.send(ex.message)
    }
});
module.exports=router;