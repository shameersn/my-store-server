module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define("Category", {
    title: DataTypes.STRING,
    color: DataTypes.STRING
  });
  return Category;
};
