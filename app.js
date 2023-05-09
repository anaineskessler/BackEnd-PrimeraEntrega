//const express = require("express");
import express from "express";
import { ProductManager } from "./ProductManager.js";
//Importamos el ProductManage

//const productManager = require("./ProductManager.js");
const app = express();
const PORT = 8080;

app.use(express.urlencoded({ extended: true }));

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});

const productManager = new ProductManager();
const products = productManager.getProducts();

//Chequeo Servidor corriendo en puerto 8080
app.get("/", (req, res) => {
  res.json({
    message: `Hola a todos ahora estamos en el Desafío 3 en el puerto ${PORT}`,
    Products: products,
  });
});

//Si me enviaron por query el ?limit = algo, entonces solo envio esa cantidad, de lo contrario todo
app.get("/products/", (req, res) => {
  const { limit } = req.query;
  res.send(limit ? products.slice(0, limit) : products);
});

//Muestro solo el Producto por ID
app.get("/products/:pid", (req, res) => {
  //dentro de req.params vienen lo que mando por la url
  const id = req.params.pid;

  //res.send(`Buscamos el producto ${id}`);
  console.log(`Buscamos el producto ${id}`);

  const productoEncontrado = productManager.getProductById(id);

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
