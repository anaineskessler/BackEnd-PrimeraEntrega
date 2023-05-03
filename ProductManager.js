const fs = require("fs");

class ProductManager {
  constructor() {
    //this.path = path;
    this.products = [];
    const productsString = fs.readFileSync("./files/products.json", "utf-8");
    const products = JSON.parse(productsString);
    this.products = products;
  }

  getProducts() {
    return this.products;
  }

  addProduct(title, description, price, thumbnail, code, stock) {
    let idMax = 0;
    this.products.forEach((prod) => {
      if (prod.id > idMax) {
        idMax = prod.id;
      }
    });
    idMax++;
    if (this.products.find((item) => item.code == code)) {
      console.log(`El códido ${code} ya existe`);
    } else {
      if (
        stock < 0 ||
        price < 0 ||
        code === `` ||
        title === "" ||
        description === "" ||
        thumbnail === ""
      ) {
        return console.log(
          "No se pueden ingresar datos en blanco o números negativos"
        );
      } else {
        let productCreate = {
          id: idMax,
          title,
          description,
          price,
          thumbnail,
          code,
          stock,
        };
        this.products.push(productCreate);
        const productsString = JSON.stringify(this.products);
        fs.writeFileSync("./files/products.json", productsString);
      }
    }
  }

  getProductById(id) {
    let prodexist = 0;
    for (let index = 0; index < this.products.length; index++) {
      if (this.products[index].id == id) {
        return this.products[index];
        prodexist = 1;
      }
    }
    if (prodexist === 0) {
      let message = `El producto con ID: ${id} no existe`;
      return message;
    }
  }

  deleteProduct(id) {
    let foundProduct = product.getProductById(id);
    console.log(`----- Producto a Eliminar ID: ${id} --------`);
    console.log("-------------");
    if (foundProduct) {
      const newProducts = this.products.filter((item) => item.id !== id);
      const productsString = JSON.stringify(newProducts);
      fs.writeFileSync("./files/products.json", productsString);
    } else {
      let message = `El producto con ID: ${id} no existe`;
      return message;
    }
  }

  updateProduct(id, ntitle, ndescription, nprice, nthumbnail, ncode, nstock) {
    let foundProduct = product.getProductById(id);
    console.log(`----- Producto a Modificar ID: ${id} --------`);
    console.log("-------------");
    if (foundProduct) {
      const upProducts = this.products.map((item) => {
        return id == item.id
          ? {
              id: id,
              title: ntitle,
              description: ndescription,
              price: nprice,
              thumbnail: nthumbnail,
              code: ncode,
              stock: nstock,
            }
          : item;
      });
      console.log(upProducts);
      const productsString = JSON.stringify(upProducts);
      fs.writeFileSync("./files/products.json", productsString);
    } else {
      let message = `El producto con ID: ${id} no existe`;
      return message;
    }
  }
}

const product = new ProductManager("./files/products.json");

// product.addProduct("Manzana", "Manzana Roja", 480, "imagen1", "FRU001", 20);
// product.addProduct("Banana", "Banana Ecuador", 380, "imagen2", "FRU002", 40);
// product.addProduct("Pera", "Pera Williams", 380, "imagen3", "FRU003", 50);
// product.addProduct("Kiwi", "Kiwi Chile", 380, "imagen4", "FRU004", 10);

//product.addProduct("", "Kiwi Chile", -380, "imagen4", "FRU0011", 10);
//product.addProduct("Frutilla", "Frutilla Coronda", 380, "imagen4", "FRU001", 10);

console.log(product.getProducts());

// Agregamos un producto que se repite el código, por lo tanto no lo agrega
//product.addProduct("Dátiles", "Dátiles Frasco", 2080, "imagen5", "FRU003", 10);

// Buscamos un artículo por ID y existe
// console.log("Buscamos el artículo cuyo ID es el 3");
// console.log(product.getProductById(3));

// Buscamos un artículo por ID y NO existe
// console.log("Buscamos el artículo cuyo ID es el 6");
// console.log(product.getProductById(6));

// Borramos un elemento, pero no existe
//product.deleteProduct(8);
//console.log(product.getProducts());

// Modificamos un elemento
product.updateProduct(
  3,
  "Pera",
  "Pera Williams",
  200,
  "imagen3",
  "FRU003",
  150
);

product.updateProduct(
  6,
  "Frutilla",
  "Frutilla Coronda",
  320,
  "imagen6",
  "FRU006",
  501
);
