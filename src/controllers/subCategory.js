import model from '../db/models';

const { SubCategory } = model;

class subCategoryManager {
  /**
   *
   * @desc Create new category
   * @route POST /api/category/
   */
  static async createSubCategory(req, res) {
    try {
      const { name, clientId,categoryId } = req.body;
      const subCategoryExist = await SubCategory.findOne({
        where: { name,clientId },
      });
      if (subCategoryExist) {
        return res.status(400).send({
          error: 'subCategory already exist',
        });
      }

      const subCategory = await SubCategory.create({
        name,
        clientId,
        categoryId
      });
      if (subCategory)
        return res.status(201).send({
          message: `${subCategory.name} added successfully`,
        });
    } catch (error) {
      return res.status(500).send({
        error: 'Server error',
        
      });
    }
  }

  /**
   *
   * @desc Get all subCategories of category
   * @route GET /api/subCategory/all/:categoryId
   */
  static async getAllSubCategory(req, res) {
    try {
      const subCategory = await SubCategory.findAll({where:{categoryId:req.params.categoryId}});
      if (subCategory.length === 0)
        return res.status(404).send({
          error: 'No subCategory found',
        });
      return res.status(200).send(subCategory);
    } catch (error) {
      return res.status(500).send({
        error: 'Server error',
        
      });
    }
  }
  /**
   *
   * @desc Get one subCategory
   * @route GET /api/subCategory/search/one/
   */
  static async getOneSubCategory(req, res) {
    try {
      const { name,clientId } = req.body;

      const subCategory = await SubCategory.findOne({ where: { name,clientId} });
      if (subCategory) {
        return res.status(200).send(subCategory);
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
   * @desc Get subCategory by id
   * @route GET /api/subCategory/:id
   */
  static async getSubCategoryById(req, res) {
    try {
      const subCategory = await SubCategory.findByPk(req.params.id);
      if (subCategory) {
        return res.status(200).send(subCategory);
      } else {
        return res.status(404).send({
          error: 'No subCategory found',
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
   * @desc UPDATE subCategory
   * @route GET /api/subCategory/:id/update
   */
  static async updateSubCategory(req, res) {
    try {
      const subCategory = await SubCategory.findByPk(req.params.id);

      if (subCategory) {
        subCategory.name = req.body.name;
      }
      const updateSubCategory = await subCategory.save();
      return res.status(200).send(updateSubCategory);
    } catch (error) {
      return res.status(500).send({
        error: 'Server error',
        
      });
    }
  }
  /**
   *
   * @desc DELETE subCategory
   * @route DELETE /api/subCategory/:id
   */
  static async deleteSubCategory(req, res) {
    try {
      const subCategoryExist = await SubCategory.findByPk(req.params.id);

      if (subCategoryExist) {
        const subCategory = await SubCategory.destroy({ where: { id: subCategoryExist.id } });
        return res.status(201).send({
          message: `subCategory deleted successfully`,
        });
      } else {
        return res.status(404).send({
          error: 'No subCategory found',
        });
      }
    } catch (error) {
      return res.status(500).send({
        error: 'Server error',
        
      });
    }
  }
}

export default subCategoryManager;
