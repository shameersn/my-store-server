module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define("Product", {
    title: DataTypes.STRING,
    imageUrl: DataTypes.STRING,
    description: DataTypes.TEXT,
    isAvailable: DataTypes.BOOLEAN,
    price: DataTypes.BIGINT
  });

  return Product;
};
