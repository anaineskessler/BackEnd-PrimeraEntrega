import fs from "fs";

class CartManager {
  constructor() {
    this.id = Date.now();
    this.products = [];
    const cartsString = fs.readFileSync("./files/carts.json", "utf-8");
    const carts = JSON.parse(cartsString);
  }

  getCarts() {
    console.log(this.carts);
    return this.carts;
  }

  addCart() {
    let cart = new CartManager();

    console.log(`Se cargo el carrito`);
    const cartsString = JSON.stringify(this.cart);
    fs.writeFileSync("./files/carts.json", cartsString);
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

  // const cartId = this.generateCartID();
  // const newCart = { id: cartId, products: [] };
  // const carts = this.getCarts();
  // console.log(carts);
  // carts.push(newCart);
  // const cartsString = JSON.stringify(this.carts);
  // fs.writeFileSync("./files/carts.json", cartsString);
  // return newCart;

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

    // for (let index = 0; index < this.carro.lengh; index++) {
    //   if (this.carts[index].id == id) {
    //     return this.carts[index];
    //   }
    // }
  }
}

const carro = new CartManager("./files/carts.json");

export { carro, CartManager };
