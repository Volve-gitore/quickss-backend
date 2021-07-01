import model from '../db/models';

const { Group } = model;

class groupManager {
  /**
   *
   * @desc Create one group
   * @route POST /api/group/
   */
  static async createGroup(req, res) {
    try {
      const { name, clientId } = req.body;
      const groupExist = await Group.findOne({ where: { name: name, clientId: clientId } });
      if (groupExist) {
        return res.status(400).send({
          error: 'group already exist',
        });
      }

      const group = await Group.create({
        name,
        clientId,
      });
      if (group)
        return res.status(201).send({
          message: `${group.name} added successfully`,
        });
    } catch (error) {
      return res.status(500).send({
        error: 'Server error',
      });
    }
  }

/**
 * create bulk groups
 * @param {*} req 
 * @param {*} res 
 */
  static async createBulkGroup(req, res) {
    try {
        const data = req.body;
        const allGroupExist = await Group.findAll();
        let foundGroup = null;

        //check if any group exist
        allGroupExist.forEach((foundElement, i) => {
          data.forEach(reqElement => {
            if(reqElement.name === foundElement.name){
              foundGroup = reqElement.name;
              
            }
          });
        });

        // save all group
        if(foundGroup){
          return res.status(409).send({
            error: `${foundGroup} already exist`,
          });
        } else {
          await Group.bulkCreate(
            data
          );
          return res.status(201).send({
            message: `groups added successfully`,
          });
        }
      } catch (error) {
        console.log("group error ", error);
      return res.status(500).send({
        error: 'Server error',
      });
    }
  }

  /**
   *
   * @desc Get all groups
   * @route GET /api/group/all/:clientId
   */
  static async getAllgroup(req, res) {
    try {
      const group = await Group.findAll({where:{clientId:req.params.clientId}});
      if (group.length === 0)
        return res.status(404).send({
          error: 'No group found',
        });
      return res.status(200).send(group);
    } catch (error) {
      return res.status(500).send({
        error: 'Server error',
      });
    }
  }
  /**
   *
   * @desc Get one group
   * @route GET /api/group/search/one/
   */
  static async getGroupByName(req, res) {
    try {
      const { name } = req.body;

      const group = await Group.findOne({ where: { name } });
      if (group) {
        return res.status(200).send(group);
      } else {
        return res.status(404).send({
          error: 'No groups found',
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
   * @desc Get group by id
   * @route GET /api/group/:id
   */
  static async getgroupById(req, res) {
    try {
      const group = await Group.findByPk(req.params.id);
      if (group.length === 0) {
        return res.status(404).send({
          error: 'No group found',
        });
      } else {
        return res.status(200).send(group);
      }
    } catch (error) {
      return res.status(500).send({
        error: 'Server error',
      });
    }
  }
  /**
   *
   * @desc UPDATE group
   * @route GET /api/group/:id/update
   */
  static async updateGroup(req, res) {
    try {
      const group = await Group.findByPk(req.params.id);

      if (group) {
        group.name = req.body.name;
      }
      const updateGroup = await group.save();
      return res.status(200).send(updateGroup);
    } catch (error) {
      return res.status(500).send({
        error: 'Server error',
      });
    }
  }
  /**
   *
   * @desc DELETE group
   * @route DELETE /api/group/:id
   */
  static async deleteGroup(req, res) {
    try {
      const groupExist = await Group.findByPk(req.params.id);

      if (groupExist) {
        const group = await Group.destroy({ where: { id: groupExist.id } });
        return res.status(201).send({
          message: `group deleted successfully`,
        });
      } else {
        return res.status(404).send({
          error: 'No group found',
        });
      }
    } catch (error) {
      return res.status(500).send({
        error: 'Server error',
      });
    }
  }
}

export default groupManager;
