import fs from "fs";

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
      }
    }
    if (prodexist === 0) {
      let message = `El producto con ID: ${id} no existe`;
      let exists = 0;
      return prodexist;
    }
  }

  deleteProduct(id) {
    let foundProduct = products.getProductById(id);
    console.log(`----- Producto a Eliminar ID: ${id} --------`);
    console.log("-------------");
    if (foundProduct) {
      const newProducts = this.products.filter((item) => item.id !== id);
      const productsString = JSON.stringify(newProducts);
      fs.writeFileSync("./files/products.json", productsString);
      return foundProduct;
    } else {
      let message = `El producto con ID: ${id} no existe`;
      return message;
    }
  }

  updateProduct(id, ntitle, ndescription, nprice, nthumbnail, ncode, nstock) {
    let foundProduct = products.getProductById(id);
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

const products = new ProductManager("./files/products.json");

export { products, ProductManager };
