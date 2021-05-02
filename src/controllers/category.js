import model from '../db/models';

const { Category } = model;

class categoryManager {
  /**
   *
   * @desc Create new category
   * @route POST /api/category/
   */
  static async createCategory(req, res) {
    try {
      const { name, type, clientId } = req.body;
      const categoryExist = await Category.findOne({ where: { name: name, clientId: clientId } });
      if (categoryExist) {
        return res.status(400).send({
          error: 'Category already exist',
        });
      }

      const category = await Category.create({
        name,
        type,
        clientId,
      });
      if (category)
        return res.status(201).send({
          message: `${category.name} added successfully`,
        });
    } catch (error) {
      return res.status(500).send({
        error: 'Server error',
       
      });
    }
  }

  /**
   *
   * @desc Get all categories
   * @route GET /api/category/all/:clientId
   */
  static async getAllCategory(req, res) {
    try {
      const category = await Category.findAll({where:{clientId:req.params.clientId}});
      if (!category)
        return res.status(404).send({
          error: 'No category found',
        });
      return res.status(200).send(category);
    } catch (error) {
      return res.status(500).send({
        error: 'Server error',
       
      });
    }
  }
  /**
   *
   * @desc Get one category
   * @route GET /api/category/search/one/
   */
  static async getOneCategory(req, res) {
    try {
      const { name,clientId } = req.body;

      const category = await Category.findOne({ where: { name,clientId } });
      if (category) {
        return res.status(200).send(category);
      } else {
        return res.status(404).send({
          error: 'No category found',
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
   * @desc Get category by id
   * @route GET /api/category/:id
   */
  static async getCategoryById(req, res) {
    try {
      const category = await Category.findByPk(req.params.id);
      if (category) {
        return res.status(200).send(category);
      } else {
        return res.status(404).send({
          error: 'No category found',
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
   * @desc UPDATE category
   * @route GET /api/category/:id/update
   */
  static async updateCategory(req, res) {
    try {
      const category = await Category.findByPk(req.params.id);

      if (category) {
        category.name = req.body.name;
      }
      const updateCategory = await category.save();
      return res.status(200).send(updateCategory);
    } catch (error) {
      return res.status(500).send({
        error: 'Server error',
       
      });
    }
  }
  /**
   *
   * @desc DELETE category
   * @route DELETE /api/category/:id
   */
  static async deleteCategory(req, res) {
    try {
      const categoryExist = await Category.findByPk(req.params.id);

      if (categoryExist) {
        const category = await Category.destroy({ where: { id: categoryExist.id } });
        return res.status(201).send({
          message: `category deleted successfully`,
        });
      } else {
        return res.status(404).send({
          error: 'No category found',
        });
      }
    } catch (error) {
      return res.status(500).send({
        error: 'Server error',
       
      });
    }
  }
}

export default categoryManager;
