import express from "express";
import { ProductManager } from "./ProductManager.js";
import { productRouter } from "./routes/products.router.js";
import { CartManager } from "./CartManager.js";
import { cartRouter } from "./routes/carts.routers.js";

const app = express();
const PORT = 8080;

app.use(express.urlencoded({ extended: true }));

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});

const productManager = new ProductManager();
const products = productManager.getProducts();

// coloco el router y la ruta fija /products y /carts
app.use("/products", productRouter);
app.use("/carts", cartRouter);

//Chequeo Servidor corriendo en puerto 8080
app.get("/", (req, res) => {
  res.json({
    message: `Hola a todos ahora estamos en el Desafío 3 en el puerto ${PORT}`,
    Products: products,
  });
});
