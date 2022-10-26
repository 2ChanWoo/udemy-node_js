const db = require('../util/database');

const Cart = require('./cart')

module.exports = class Product {
  constructor(id, title, imageUrl, description, price) {
    this.id = id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  //! INSERT 에서, VALUES 값을 ? 로 하는 이유는, SQL injection 을 방지하기 위하여 숨기기 위함이다.
  save() {
    return db.execute('INSERT INTO products (title, price, imageUrl, description) VALUES (?, ?, ?, ?)',
    [this.title, this.price, this.imageUrl, this.description]);
  }

  //udemy code
  static deleteById(id) {
 
  }

  static fetchAll(cb) {
  return db.execute('SELECT * FROM products');
  }

  static findById(id, cb) {
    return db.execute('SELECT * FROM products WHERE products.id = ?', [id]);
  }
};
