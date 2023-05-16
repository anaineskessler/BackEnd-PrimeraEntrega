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

  let id = parseInt(req.params.pid);

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
  let id = parseInt(req.params.id);
  console.log(id);
  console.log(products);
  let ntitle = req.body.title;
  let ndescription = req.body.description;
  let ncode = req.body.code;
  let nprice = req.body.price;
  let nthumbnail = req.body.thumbnail;
  let nstock = req.body.stock;
  console.log("!!!", ndescription);
  const indiceEncontrado = products.updateProduct(
    id,
    ntitle,
    ndescription,
    nprice,
    nthumbnail,
    ncode,
    nstock
  );
  // products[indiceEncontrado] = {
  //   id: products[indiceEncontrado].id,
  //   ...producto,
  // };
  return res.status(200).json({
    status: "success",
    msg: "producto modificado",
    data: products[indiceEncontrado],
  });
});
