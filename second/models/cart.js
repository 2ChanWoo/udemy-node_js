const fs = require('fs');
const path = require('path');

const p = path.join(
    path.dirname(require.main.filename),
    'data',
    'cart.json'
);

module.exports = class Cart {
    static addProduct(id, productPrice) {
        fs.readFile(p, (err, fileContent) => {
            let cart = {products: [], totalPrice: 0};
            if(!err) {
                cart = JSON.parse(fileContent);
            }
        
            const existingProductIndex = cart.products.findIndex(prod => prod.id === id);
            let updatedProduct;

            console.log(existingProductIndex);

            if(existingProductIndex != -1) {
                cart.products[existingProductIndex].qty++;
                // const existingProduct = cart.products[existingProductIndex];
                // updatedProduct = {...existingProduct};
                // updatedProduct.qty = updatedProduct.qty++;
                // cart.products = [...cart.products]; ............................>>> 원래 코드 이해 못하겠음...

                // cart.products[existingProductIndex] = updatedProduct;
            } else {
                updatedProduct = {id: id, qty: 1};
                cart.products = [...cart.products, updatedProduct];
            }

            cart.totalPrice = cart.totalPrice + +productPrice;

            fs.writeFile(p, JSON.stringify(cart), err => {
                console.log(err);
            });
        })
    }
}