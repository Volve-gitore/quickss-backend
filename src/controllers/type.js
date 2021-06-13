import model from '../db/models';

const { Type } = model;

class TypeManager {
  /**
   *
   * @desc Create new type
   * @route POST /api/type/
   */
  static async createType(req, res) {
    try {
      const { name, clientId } = req.body;
      const typeExist = await Type.findOne({ where: { name: name, clientId: clientId } });
      if (typeExist) {
        return res.status(409).send({
          error: 'Type already exist',
        });
      }
      const type = await Type.create({
        name,
        clientId,
      });
      if (type)
        return res.status(201).send({
          message: `${type.name} added successfully`,
        });
    } catch (error) {
      return res.status(500).send({
        error: 'Server error',
      });
    }
  }

  /**
   *
   * @desc Get all types
   * @route GET /api/type/all/:clientId
   */
  static async getAllType(req, res) {
    try {
      const type = await Type.findAll({where:{clientId:req.params.clientId}});
      if (type.length === 0)
        return res.status(404).send({
          error: 'No Type found',
        });
      return res.status(200).send(type);
    } catch (error) {
      return res.status(500).send({
        error: 'Server error',
      });
    }
  }
 
  /**
   *
   * @desc Get type by id
   * @route GET /api/type/:id
   */
  static async getTypeById(req, res) {
    try {
      const type = await Type.findByPk(req.params.id);
      if (type) {
        return res.status(200).send(type);
      } else {
        return res.status(404).send({
          error: 'No Type found',
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
   * @desc UPDATE type
   * @route GET /api/type/:id/update
   */
  static async updateType(req, res) {
    try {
      const type = await Type.findByPk(req.params.id);
      if (type) {
        type.name = req.body.name;
      }
      const updateType = await type.save();
      return res.status(200).send(updateType);
    } catch (error) {
      return res.status(500).send({
        error: 'Server error'
      });
    }
  }
  /**
   *
   * @desc DELETE type
   * @route DELETE /api/type/:id
   */
  static async deleteType(req, res) {
    try {
      const typeExist = await Type.findByPk(req.params.id);

      if (typeExist) {
        const type = await Type.destroy({ where: { id: typeExist.id } });
        return res.status(201).send({
          message: `Type deleted successfully`,
        });
      } else {
        return res.status(404).send({
          error: 'No Type found',
        });
      }
    } catch (error) {
      return res.status(500).send({
        error: 'Server error',
      });
    }
  }
}

export default TypeManager;
