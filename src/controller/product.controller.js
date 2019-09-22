const {
  Product,
  Sequelize: { Op }
} = require("../models");

async function getProducts(req, res) {
  let where = {};
  const { search } = req.query;
  console.log(search);
  if (search) {
    where = {
      [Op.or]: [
        {
          title: {
            [Op.like]: `%${search}%`
          }
        },
        {
          description: {
            [Op.like]: `%${search}%`
          }
        }
      ]
    };
  }

  const products = await Product.findAll({ where, limit: 10 });

  res.status(200).json(products);
}

async function createProduct(req, res) {
  const product = await Product.create(req.body);

  res.status(201).json(product);
}

async function getProduct(req, res) {
  const { productId } = req.params;
  const product = await Product.findOne({
    where: {
      id: productId
    }
  });

  res.status(200).json(product);
}

async function updateProduct(req, res) {
  const { productId } = req.params;
  const product = await Product.update(req.body, {
    where: {
      id: productId
    }
  });

  res.status(200).json(product);
}

async function deleteProduct(req, res) {
  const { productId } = req.params;
  const product = await Product.destroy({
    where: {
      id: productId
    }
  });

  res.status(200).json(product);
}

module.exports = {
  getProducts,
  createProduct,
  getProduct,
  updateProduct,
  deleteProduct
};
