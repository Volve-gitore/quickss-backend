import model from '../../db/models/index';
import { hotelRestoSchema } from './schema/hotelresto';
import errorGroup from '../../helpers/joiErrorHandler';

const { HotelResto } = model;

/**
 *  user validatons
 */
class HotelRestoValidation {
  /**
   * @param {object} req
   * @param {object} res
   * @param {object} next
   */
  static async HotelRestoValidator(req, res, next) {
    try {
      const hotelResto = {
        name: req.body.name,
        category: req.body.category,
        description: req.body.description,
        location: req.body.location,
        bouquet: req.body.bouquet,
        status: req.body.status,
      };
      const checkhotelResto = hotelRestoSchema.validate(hotelResto, { abortEarly: false });
      if (checkhotelResto.error) {
        const errors = errorGroup(checkhotelResto);

        return res.status(400).json({ error: errors });
      }

      const hotelRestoExist = await HotelResto.findOne({ where: { name: hotelResto.name } });
      if (hotelRestoExist)
        return res.status(409).json({
          error: `${hotelResto.category} already registered`,
        });
      next();
    } catch (error) {
      return res.status(500).json({ error: 'server error' });
    }
  }
}
export default HotelRestoValidation;
