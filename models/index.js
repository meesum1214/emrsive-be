const Sequelize = require("sequelize");
const { HOST, USER, PASSWORD, DB, dialect } = require("../config.js/db");

let sequelize = new Sequelize({
  host: HOST,
  username: USER,
  password: PASSWORD,
  database: DB,
  dialect: dialect,
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("./user.model.js")(sequelize, Sequelize);
db.roles = require("./roles.model.js")(sequelize, Sequelize);
db.plans = require("./plans.model.js")(sequelize, Sequelize);
db.cart = require('./cart.model.js')(sequelize, Sequelize);
db.order = require('./order.model.js')(sequelize, Sequelize);

// relation between users and roles
db.user.belongsTo(db.roles, { foreignKey: "role_id" });
db.roles.hasMany(db.user, { foreignKey: "role_id" });

// relation between user and cart
db.cart.belongsTo(db.user, {foreignKey: "user_id"});
db.user.hasMany(db.cart, {foreignKey: "user_id"});

// relation between cart and plan
db.cart.belongsTo(db.plans, {foreignKey: "plan_id"});
db.plans.hasMany(db.cart, {foreignKey: "plan_id"});

// relation between user and order
db.order.belongsTo(db.user, {foreignKey: "user_id"});
db.user.hasMany(db.order, {foreignKey: "user_id"});

module.exports = db;