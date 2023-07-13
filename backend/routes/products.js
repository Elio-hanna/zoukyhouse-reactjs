import express from "express";
import { getProducts, addProduct, deleteProduct } from "../controllers/product.js";

const router = express.Router();

router.get("/", getProducts);
router.post("/", addProduct);
// router.get("/:id", getProduct);
router.delete("/:id", deleteProduct);
// router.put("/:id", updatePost);

export default router;
