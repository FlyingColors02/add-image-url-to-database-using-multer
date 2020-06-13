let mongoose = require("mongoose");

let fileSchema = new mongoose.Schema({
    image:{type:String}
});

let fileModel = mongoose.model("imageUploads",fileSchema);

module.exports=fileModel;