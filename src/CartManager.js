import fs from "fs";

class CartManager {
  constructor() {
    this.id = Date.now();
    this.products = [];
    this.path = "./files/carts.json";
    const cartsString = fs.readFileSync(this.path, "utf-8");
    const carts = JSON.parse(cartsString);
  }

  getCarts() {
    console.log(this.carts);
    return this.carts;
  }

  generateId = () => {
    if (!fs.existsSync(this.path)) return 1;
    this.products = JSON.parse(fs.readFileSync(this.path, "utf-8"));
    let id = this.products[this.products.length - 1].id + 1;
    return id;
  };

  saveFile = async (cart) => {
    let code = 0;
    if (!fs.existsSync(this.path)) {
      fs.writeFileSync(this.path, JSON.stringify([], null, "\t"));
    }
    const data = await this.getCarritos();
    data.push(cart);
    fs.writeFileSync(this.path, JSON.stringify(data, null, "\t"));
    code = 201;
    return code;
  };

  addCart() {
    id = this.generateId();
    let cart = { id, products: [] };
    codigo = this.saveFile(cart);
    console.log(`Se cargo el carrito`);
    return codigo;
  }

  addCartProd(cartId, productId) {
    const cart = this.carts.getCartById(cartId);
    const existingProduct = cart.products.find(
      (product) => product.id === productId
    );

    if (existingProduct) {
      existingProduct.quantity++;
    } else {
      const product = this.products.getProductById(productId);
      if (!product) {
        return;
      }
      cart.products.push({
        id: product.id,
        quantity: 1,
      });
    }
    const cartsString = JSON.stringify(this.carts);
    fs.writeFileSync("./files/carts.json", cartsString);

    console.log(`Producto ${productId} agregado al carrito ${cartId}`);
  }

  getCartById(id) {
    let cartexist = 0;
    console.log(carro, carro.id);
    this.carro.forEach((element) => {
      if (element.id == id) {
        cartexist = 1;
        return this.carro.id;
      }
      if (cartexist === 0) {
        let message = `El carrito con ID: ${id} no existe`;
        let exists = 0;
        return;
      }
    });
  }
}

const carro = new CartManager("./files/carts.json");

export { carro, CartManager };
