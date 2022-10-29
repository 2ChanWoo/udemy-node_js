const Sequelize = require('sequelize');

const sequelize = new Sequelize('udemy_schema', 'root', 'cksdnR23', {
    dialect: 'mysql',
    host: 'localhost'
});

module.exports = sequelize;