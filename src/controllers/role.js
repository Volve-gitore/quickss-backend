import model from '../db/models';

const { Role } = model;

class roleManager {
    
  /**
   *
   * @desc Create new role
   * @route POST /api/role/
   */
  static async createRole(req, res) {
    try {
      const { name } = req.body;
      const roleExist = await Role.findOne({ where: { name: name } });
      if (roleExist) {
        return res.status(409).send({
          error: 'role already exist',
        });
      }

      const role = await Role.create({
        name,
      });
      if (role)
        return res.status(201).send({
          message: `${role.name} added successfully`,
        });
    } catch (error) {
      return res.status(500).send({
        error: 'Server error',
      });
    }
  }

  /**
   *
   * @desc Get all roles
   * @route GET /api/role/all/
   */
  static async getRoles(req, res) {
    try {
      const roles = await Role.findAll();
      if (roles.length === 0)
        return res.status(404).send({
          error: 'no role found',
        });

      return res.status(200).send({
        roles: roles,
      });
    } catch (error) {
      return res.status(500).send({
        error: 'Server error',
      });
    }
  }
}

export default roleManager;
