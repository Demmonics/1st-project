import express, { json } from "express";
import dotenv from "dotenv";
import { connectDB } from "./Config/db.js";
import Product from "./models/Product.js"; // Importing the Product model
dotenv.config();

const app = express();

app.use(express.json()); // allows us to accept json data in the body

app.get("/api/products", async (req, res) => {
    try {
        const products = await Product.find({}); // Fetching all products from the database and the curly brackets indicate that it should fetch all the products
        res.status(200).json({ success: true, data: products }); //sending the products back to the user 
    } catch (error) {
        console.log("Error in fetching products:", error.message);
        res.status(500).json({ success: false, message: "Server error" }); //Error in creating product sent to the user 
    }
});

app.post("/api/products", async (req, res) =>{
    const product = req.body; // user will send this data to the server
    if(!product.name || !product.price || !product.image) {
        return res.status(400).json({success:false, message: "Please fill all the fields" });
    }
    const newProduct = new Product(product); // creating new product if everything is fine
    try {
        await newProduct.save();
        res.status(201).json({ success: true, data: newProduct }); 
    }
    catch (error) {
        console.error("Error creating product:", error.message); // for debugging purposes
        res.status(500).json({ success: false, message: "Internal Server Error" });// sending error response back to the user
    }
})

app.put("/api.products/:id", async (req,res) => {
    const {id} = req.params; // getting the id from the url
    const product = req.body; //getting product data from the body
    try {
        const updatedProduct = await Product.findByIdAndUpdate(id, product, { new: true }); // updating the product with the given id
    
    } catch (error) {
        console.log("Error in updating product:", error.message);
        return res.status(404).json({ success: false, message: "Product not found" });
        
    }
})

app.delete("/api/products/:id", async (req, res) => {
    const { id } = req.params; // getting the id from the url
    

    try {
        await Product.findByIdAndDelete(id); // deleting the product with the given id
        res.status(200).json({success:true, message:"Product has been deleted"});
    }
    catch (error) {
        console.log("Error in deleting products:", error.message);
        res.status(404).json({success: false, messgae:"Product not found"});
    }
});
app.listen(5000, () => {
    connectDB();
    console.log("Server started at http://localhost:5000 ");
});

