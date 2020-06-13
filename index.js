let express=require("express");
let mongoose = require("mongoose");
let port = process.env.PORT||4500;
let uploads = require("./routes/fileuploads");
let app = express();

app.use("/uploads",express.static("uploads"));
app.use("/api/file",uploads);

mongoose.connect("mongodb://localhost/CoordinateMongodb&Express")
        .then(()=>console.log("connected to database"))
        .catch(error=>console.log(`something went wrong ${error.message}`));
        
app.listen(port,()=>{
    console.log(`port is working on ${port}`)
});