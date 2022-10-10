const fs = require('fs');
const path = require('path');

const p = path.join(
  path.dirname(require.main.filename),
  'data',
  'products.json'
);

const getProductsFromFile = cb => {
  fs.readFile(p, (err, fileContent) => {
    if (err) {
      cb([]);
    } else {
      cb(JSON.parse(fileContent));
    }
  });
};

module.exports = class Product {
  constructor(id, title, imageUrl, description, price) {
    this.id = id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  save() {
    getProductsFromFile(products => {
      if(this.id) {
        const existingProductIndex = products.findIndex(prod => prod.id === this.id);
        const updatedProducts = [...products];
        updatedProducts[existingProductIndex] = this;
        fs.writeFile(p, JSON.stringify(updatedProducts), err => {
          console.log(err);
        });
      } else {
        this.id = Math.random().toString();
        products.push(this);
        fs.writeFile(p, JSON.stringify(products), err => {
          console.log(err);
        });
      }
    });
  }

  static delete(id) {
    console.log(id);
    getProductsFromFile(products => {
      if(id) {
        var updatedProducts = [...products];
        const deleteProdId = updatedProducts.findIndex(prod => {id === prod.id});
        //updatedProducts = updatedProducts.splice(deleteProdId, 1);  //! 배열객체를 deleted된 배열로 만들고, deleted된 부분을 반환하는 함수..
        updatedProducts.splice(deleteProdId, 1);


        console.log("u p :" + updatedProducts[0]);

        fs.writeFile(p, JSON.stringify(updatedProducts), err => {
          console.log("[err]" + err);   //! 여가에 걸리는 것 같은데, err값은 없음..
        });
      }
    });
  }

  static fetchAll(cb) {
    getProductsFromFile(cb);
  }

  static findById(id, cb) {
    getProductsFromFile(products => {
      const product = products.find(p => p.id === id);
      cb(product);
    });
  }
};
