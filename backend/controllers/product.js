import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getProducts = async (req, res) => {
  try {
    const products = await prisma.product.findMany({
      include: {
        category: true,
      },
      orderBy: [
        {
          productPrice: "asc",
        },
      ],
    });
    const formattedProducts = products.map((product) => {
      return {
        idproduct: product.idproduct,
        productName: product.productName,
        productPrice: product.productPrice,
        category: product.category.categoryName,
      };
    });
    res.json(formattedProducts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const addProduct = async (req, res) => {
  try {
    const categoryName = req.body.cat;
    const category = await prisma.category.findFirst({
      where: { categoryName },
    });
    const productData = {
      productName: req.body.Name,
      productPrice: req.body.Price,
      categoryId: category.idCategory,
    };

    const newProduct = await prisma.product.create({
      data: productData,
    });

    res.status(200).json({ "Product added:": newProduct });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
    console.error("Error adding product:", error);
  } finally {
    await prisma.$disconnect();
  }
};
