const mongoose = require("mongoose"); 
mongodburl= process.env.MONGODB_URL || "mongodb+srv://ntejas023:Nh33nJICro4hwCNC@cluster0.sabedyk.mongodb.net/e-comm";

mongoose.connect(mongodburl);

