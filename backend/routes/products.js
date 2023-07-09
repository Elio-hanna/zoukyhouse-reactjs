import express from "express";
import { getProducts, addProduct } from "../controllers/product.js";

const router = express.Router();

router.get("/", getProducts);
router.post("/", addProduct);
// router.get("/:id", getProduct);
// router.delete("/:id", deletePost);
// router.put("/:id", updatePost);

export default router;
