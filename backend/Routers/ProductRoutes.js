import express from "express";
import upload from "../Middlewares/upload.js";
import { AddProduct,GetProducts } from "../Controlers/ProductsControler.js";
import { verifyToken } from "../Middlewares/auth.js";

const router = express.Router();

router.post(
  "/addproduct",
  upload.single("image"),
  AddProduct
);
router.get("/", GetProducts);

export default router;