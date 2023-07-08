import express from "express";
import { getProducts } from "../controllers/product.js";

const router = express.Router();

router.get("/", getProducts);
// router.get("/:id", getProduct);
// router.post("/", addProduct);
// router.delete("/:id", deletePost);
// router.put("/:id", updatePost);

export default router;