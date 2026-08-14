import Product from "../Models/Products.js";

export async function GetProducts(req, res) {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({
      msg: "Internal server failure",
      message: error.message
    });
  }
}
export async function GetProductById(req, res) {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ msg: "Product not found" });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({
      msg: "Internal server failure",
      message: error.message
    });
  } 
}
export async function AddProduct(req, res) {
  try {
    const { name, description, price, category} = req.body; 
    const image = req.file ? req.file.path : null; // Get the uploaded image path

    if (!image) {
      return res.status(400).json({ msg: "Image is required" });
    }
    const product = {
        name,
        description,
        price,
        category,
        image
    };
    const newProduct = await Product.create(product);
    res.status(201).json(newProduct);
  }
  catch (error) {
    res.status(500).json({
      msg: "Internal server failure",
      message: error.message
    });
  }
  }

   
    
    
