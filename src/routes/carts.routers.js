import express from "express";
import { carro } from "../CartManager.js";
export const cartRouter = express.Router();

cartRouter.get("/", (req, res) => {
  console.log(carro);
  res.json(carro);
});

//Muestro solo el Carrito por ID
cartRouter.get("/:pid", (req, res) => {
  //dentro de req.params vienen lo que mando por la url
  const id = req.params.pid;

  //res.send(`Buscamos el producto ${id}`);
  console.log(`Buscamos el Carrito ${id}`);

  const carritoEncontrado = carts.getCartById(id);

  if (carritoEncontrado !== 0) {
    console.log(carritoEncontrado);
    res.json({
      Mensaje: `El Carrito con ID: ${id} es`,
      Carrito: carritoEncontrado,
    });
  } else {
    console.log(`El carrito con ID: ${id} no se encuentra`);
    res.json({
      Error: "error",
      Mensaje: `El carrito con ID: ${id} no se encuentra`,
    });
  }
});

//agregamos un carrito o actualizamos
cartRouter.post("/", (req, res) => {
  const carrito = req.body;
  console.log(carrito);
  carro.addCart(carrito.id, 1);
  return res
    .status(201)
    .json({ status: "success", msg: "carrito creado", data: carrito });
});

// agregar carrito y producto en él /:cid/product/:pid

cartRouter.post("/:cid/product/:pid", async (req, res) => {
  try {
    const cartId = parseInt(req.params.cid);
    const productId = parseInt(req.params.pid);

    // Verificar si el carrito existe
    const cart = CartManager.getCartById(cartId);
    if (!cart) {
      return res
        .status(404)
        .json({ message: `Carrito ${cartId} no encontrado` });
    }

    // Verificar si el producto existe
    const product = CartManager.getProductById(productId);
    if (!product) {
      return res
        .status(404)
        .json({ message: `Producto ${productId} no encontrado` });
    }

    CartManager.addProductToCart(cartId, productId);
    res.json({
      message: `Producto ${productId} agregado al carrito ${cartId}`,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
