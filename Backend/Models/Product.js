import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const productSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    price:{
        type: Number,
        required: true,
    },
    image:{
        type: String,
        required: true,
    },

},{
    timestamps:true, // This will add createdAt and updatedAt fields automatically
});

const Product = mongoose.model("Product", productSchema);
export default Product;
// This line creates a model named "Product" based on the productSchema.
// The model is then exported so it can be used in other parts of the application.
// The model will be used to interact with the products collection in the MongoDB database.
// The model provides methods to create, read, update, and delete products in the database.
// The timestamps option in the schema will automatically add createdAt and updatedAt fields to each product
// document, which can be useful for tracking when products were added or modified.
// The productSchema defines the structure of the product documents in the MongoDB collection.
// The name field is a string that is required, meaning it must be provided when creating a product.
// The price field is a number that is also required, ensuring that every product has a price.
// The image field is a string that is required, typically used to store the URL or path to the product's image.
