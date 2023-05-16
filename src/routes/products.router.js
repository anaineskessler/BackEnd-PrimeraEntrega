import express from "express";
import { products } from "../ProductManager.js";
export const productRouter = express.Router();

//Si me enviaron por query el ?limit = algo, entonces solo envio esa cantidad, de lo contrario todo
productRouter.get("/", (req, res) => {
  const { limit } = req.query;
  res.send(limit ? products.slice(0, limit) : products);
});

//Muestro solo el Producto por ID
productRouter.get("/:pid", (req, res) => {
  //dentro de req.params vienen lo que mando por la url
  const id = req.params.pid;

  //res.send(`Buscamos el producto ${id}`);
  console.log(`Buscamos el producto ${id}`);

  const productoEncontrado = products.getProductById(id);

  if (productoEncontrado !== 0) {
    console.log(productoEncontrado);
    res.json({
      Mensaje: `El producto con ID: ${id} es`,
      Producto: productoEncontrado,
    });
  } else {
    console.log(`El producto con ID: ${id} no se encuentra`);
    res.json({
      Error: "error",
      Mensaje: `El producto con ID: ${id} no se encuentra`,
    });
  }
});

// Eliminar un producto
productRouter.delete("/:id", (req, res) => {
  const id = req.params.id;
  console.log(products);
  const productoEliminado = products.deleteProduct(id);
  if (productoEliminado !== 0) {
    console.log(productoEliminado);
    return res.json({
      Mensaje: `El producto con ID: ${id} es`,
      Producto: productoEliminado,
    });
  } else {
    console.log(`El producto con ID: ${id} no se encuentra`);
    return res.status(200).json({
      Error: "error",
      Mensaje: `El producto con ID: ${id} no se encuentra`,
    });
  }
});

//agregamos un producto
productRouter.post("/", (req, res) => {
  const producto = req.body;
  console.log(producto);
  producto.id = (Math.random() * 1000000000000000).toFixed(0);
  producto.createdAt = Date.now();
  products.addProduct(producto);
  return res
    .status(201)
    .json({ status: "success", msg: "producto creado", data: producto });
});

productRouter.put("/:id", (req, res) => {
  const id = req.params.id;
  console.log(id);
  const producto = req.body;
  producto.id = id;
  console.log(producto);
  const indiceEncontrado = products.updateProduct(producto);
  products[indiceEncontrado] = {
    id: products[indiceEncontrado].id,
    ...producto,
  };
  return res.status(200).json({
    status: "success",
    msg: "producto modificado",
    data: products[indiceEncontrado],
  });
});
