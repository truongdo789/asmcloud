const express = require('express');
var router = express.Router();

var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb+srv://anchoiha15:Truong123@cluster0-huizq.gcp.mongodb.net/test';
router.get("/", async (req, res) => {
    let client = await MongoClient.connect(url);
    let dbo = client.db("ShopToy");

    let result = await dbo.collection("product").find({}).toArray();
    res.render("allProduct", { product: result });
});

router.get('/insert', (req, res)=>{
    res.render('insertProduct');
});

router.get('/delete', async (req, res)=>{
    let id = req.query.id;
    var ObjectId = require("mongodb").ObjectId;
    console.log(id);
    let condition = {"_id": ObjectId(id)};
    let client = await MongoClient.connect(url);
    let dbo = client.db("ShopToy");
    await dbo.collection("product").deleteOne(condition);

    let result = await dbo.collection("product").find({}).toArray();
    res.render("allProduct", { product: result });
});

router.post("/doInsert", async (req, res) => {
    let client = await MongoClient.connect(url);
    let dbo = client.db("ShopToy");
    let name = req.body.name;
    let price = req.body.price;
    let id = req.body.id;
    let img = req.body.img;
    let status = req.body.status;
    let newProduct = {
        ProductId: id,
        ProductName: name,
        Image: img,
        Price: price,
        Status: status,
    };
    await dbo.collection("product").insertOne(newProduct);

    let result = await dbo.collection("product").find({}).toArray();
    res.render("allProduct", { product: result });
});

module.exports = router;