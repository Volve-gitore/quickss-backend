import model from '../db/models';
const { Op } = require('sequelize');
const { Product, ProductGroups } = model;
import { uploader } from '../middlewares/cloudinary';
import path from 'path';
import imageDataURI from 'image-data-uri';

class productManager {
  /**
   *
   * @desc Create new product
   * @route POST /api/product/
   */
  static async createProduct(req, res) {
    try {
      const {
        name,
        type,
        currency,
        price,
        flag,
        description,
        clientId,
        groupId,
        categoryId,
        subCategoryId,
      } = req.body;
      const productExist = await Product.findOne({
        where: { name, clientId },
      });
      if (productExist) {
        return res.status(409).send({
          error: 'product exist',
        });
      }

      const images = [];

      for (let image in req.files) {
        const dataBuffer = new Buffer.from(req.files[image].buffer);
        const mediaType = path.extname(req.files[image].originalname).toString();

        const imageData = imageDataURI.encode(dataBuffer, mediaType);
        const uploadedImage = await uploader.upload(imageData);
        images.push(uploadedImage.url);
      }

      const product = await Product.create({
        name,
        type,
        currency,
        price,
        flag,
        description,
        images,
        clientId,
        groupId,
        categoryId,
        subCategoryId
      });
      if (product) {
        const productGroup = await ProductGroups.create({ productId: product.id, groupId });
        if (productGroup)
          return res.status(201).send({
            message: `${product.name} created successfully`,
          });
      }
    } catch (error) {
      return res.status(500).json({
        error: 'Server error',
      });
    }
  }

  /**
   *
   * @desc Get all products
   * @route GET /api/product/all/:clientId
   */
  static async getAllproduct(req, res) {
    try {
      const product = await Product.findAll({where:{clientId:req.params.clientId}});
      if (!product)
        return res.status(404).send({
          error: 'No product found',
        });
      return res.status(200).send(product);
    } catch (error) {
      return res.status(500).send({
        error: 'Server error',
        
      });
    }
  }
  /**
   *
   * @desc Get one products
   * @route GET /api/product/search/one/
   */
  static async getOneProduct(req, res) {
    try {
      const { searchItem,clientId } = req.body;

      const product = await Product.findOne({
        where: {
          [Op.or]: [
            { productId: { [Op.substring]: searchItem } },
            { name: { [Op.substring]: searchItem } },
            { type: { [Op.substring]: searchItem } },
            { price: { [Op.substring]: searchItem } },
            { flag: { [Op.substring]: searchItem } },
          ], clientId:clientId
        },
      });
      if (product) {
        return res.status(200).send(product);
      } else {
        return res.status(404).send({
          error: 'No product found',
        });
      }
    } catch (error) {
      return res.status(500).send({
        error: 'Server error',
        
      });
    }
  }
  /**
   *
   * @desc UPDATE product
   * @route GET /api/product/:id/update
   */
  static async updateProduct(req, res) {
    try {
      const {
        productId,
        name,
        type,
        price,
        flag,
        clientId,
        groupId,
        categoryId,
        subCategoryId,
      } = req.body;
      const product = await Product.findByPk(req.params.id);
      if (product) {
        const updateProduct = await Product.update(
          {
            productId,
            name,
            type,
            price,
            flag,
            clientId,
            categoryId,
            subCategoryId,
          },
          { where: { id: product.id } },
        );
        if (groupId) {
          const productGroup = await ProductGroups.findOne({ where: { productId: product.id } });
          productGroup.groupId = groupId;
          const updateProduct = await productGroup.save();
        }
        return res.status(200).send('product updated');
      }
    } catch (error) {
      return res.status(500).send({
        error: 'Server error',
        
      });
    }
  }
  /**
   *
   * @desc DELETE product
   * @route DELETE /api/product/
   */
  static async deleteProduct(req, res) {
    try {
      const { productId, clientId } = req.body;
      const productExist = await Product.findOne({
        where: { productId, clientId },
      });
      if (productExist) {
        const product = await Product.destroy({ where: { id: productExist.id } });
        return res.status(201).send({
          message: `product deleted successfully`,
        });
      } else {
        return res.status(404).send({
          error: 'No product found',
        });
      }
    } catch (error) {
      return res.status(500).send({
        error: 'Server error',
        
      });
    }
  }
}
export default productManager;
