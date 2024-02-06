const express = require("express");
const cors = require("cors");
const Jwt = require("jsonwebtoken");
require('dotenv').config();
mongodburl= process.env.mongodburl;
require("./Db/config");
const User = require("./Db/User");
const Product = require("./Db/Product");

const app = express();
app.use(express.json());
app.use(cors());
const PORT = process.env.PORT || 4000;

const jwtkey = process.env.JWT_SECRET || "e-comm";

app.post("/signup", async (req, res) => {
  let user = new User(req.body);
  let result = await user.save();
  result = result.toObject();
  delete result.password;
  if (user) {
    Jwt.sign({ user }, jwtkey, { expiresIn: "2h" }, (err, token) => {
      if (err) {
        res.send({ result: "Result Not Found" });
      }
      res.send({ result, token: token });
    });
  } else {
    res.send({ result: "no user found" });
  }
});

app.post("/login", async (req, res) => {
  if (req.body.email && req.body.password) {
    let user = await User.findOne(req.body).select("-password");
    if (user) {
      Jwt.sign({ user }, jwtkey, { expiresIn: "2h" }, (err, token) => {
        if (err) {
          res.send({ result: "Result Not Found" });
        }
        res.send({ user, token: token });
      });
    } else {
      res.send({ result: "no user found" });
    }
  } else {
    res.send({ result: "Enter password and email both" });
  }
});

app.post("/add-product", verifytoken, async (req, res) => {
  let product = new Product(req.body);
  let result = await product.save();
  res.send(result);
});

app.delete("/product/:id", verifytoken, async (req, res) => {
  let productdelted = await Product.deleteOne({ _id: req.params.id });
  res.send(productdelted);
});

app.get("/products", verifytoken, async (req, res) => {
  let products = await Product.find();
  if (products.length > 0) {
    res.send(products);
  } else {
    res.send({ message: "no products available" });
  }
});

app.get("/product/:id", verifytoken, async (req, res) => {
  let result = await Product.findOne({ _id: req.params.id });
  if (result) {
    res.send(result);
  } else {
    res.send({ result: "no result found" });
  }
});

app.put("/product/:id", verifytoken, async (req, res) => {
  let result = await Product.updateOne(
    { _id: req.params.id },
    {
      $set: req.body,
    }
  );
  res.send(result);
});

app.get("/profile/:id", verifytoken, async (req, res) => {
  let result =  await User.findOne({ _id: req.params.id });
  
  if (result) {
    res.send(result);
  } else {
    res.send({ result: "no result found" });
  }
});



app.get("/search/:key", verifytoken, async (req, res) => {
  let result = await Product.find({
    $or: [
      { name: { $regex: req.params.key } },
      { price: { $regex: req.params.key } },
      { category: { $regex: req.params.key } },
      { company: { $regex: req.params.key } },
    ],
  });
  res.send(result);
});

function verifytoken(req, res, next) {
  let token = req.headers["authorization"];
  
  if (token) {
    token = token.split(" ")[1];
    
    

    Jwt.verify(token,jwtkey,(err,sucess)=>{
      if(err){
             res.status(401).send({ result: "Please add  valid token" });
      }else{
              next();
      }
    })
   } else {
    res.status(403).send({ result: "Please add token" });
  }
}

app.listen(PORT);
