const { Sequelize } = require('sequelize');
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'mysql'
});

const User = require('./user')(sequelize);
const Product = require('./product')(sequelize);
const Cart = require('./cart')(sequelize);

// Associations
User.hasMany(Cart);
Cart.belongsTo(User);

Product.hasMany(Cart);
Cart.belongsTo(Product);

module.exports = { sequelize, User, Product, Cart };
