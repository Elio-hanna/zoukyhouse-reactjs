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
