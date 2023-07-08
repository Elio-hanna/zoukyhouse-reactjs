import express from "express"
import catRoutes from "./routes/categories.js"
import prodRoutes from "./routes/products.js"



// create our app
const app = express()
app.use(express.json())

app.use("/api/categories", catRoutes);
app.use("/api/products",prodRoutes)

//backend port
app.listen(8800, () => {
  console.log("Server is running on port 8800");
});