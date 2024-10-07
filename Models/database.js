const mongoose = require('mongoose');
const express = require('express');
const { lchownSync } = require('node:fs');
const app = express();

// Correct MongoDB connection URL
mongoose.connect("mongodb://127.0.0.1:27017/Demo", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB:', err));

// Define the Product Schema
const productSchema = new mongoose.Schema({
    products: [{
        id: Number,
        title: String,
        description: String,
        price: Number,
        discountPercentage: Number,
        rating: Number,
        stock: Number,
        brand: String,
        category: String,
        thumbnail: String,
        images: [String]
    }]
});

// Define the Product model
const Product = mongoose.model('Test', productSchema);

app.get('/', (req,res)=>{
    Product.find().then(p =>{
        res.json(p);
    })
})
app.get('/:title', (req,res)=>{
    var titles = req.params.title

    Product.findOne({'products.title':titles}).then(p =>{
        if (!p){
            return "No Data"
        }
        const l = p.products.find(data =>data.title === titles);
        if (l){
            res.json(l);
        }
        else{
            res.json("No Data");
        }
        
    }).catch(err=>{
        res.status(404).json({message: 'Product not found'});
    });
})

// Start the server
app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
