// import model from '../../db/models/index';
// import { clientSchema } from './schema/client';
// import errorGroup from '../../helpers/joiErrorHandler';

// const { HotelResto } = model;

// /**
//  *  user validatons
//  */
// class ClientValidation {
//   /**
//    * @param {object} req
//    * @param {object} res
//    * @param {object} next
//    */
//   static async ClientValidator(req, res, next) {
//     try {
//       const client = {
//         name: req.body.name,
//         category: req.body.category,
//         description: req.body.description,
//         location: req.body.location,
//         bouquet: req.body.bouquet,
//         status: req.body.status,
//       };
//       const checkClient = clientSchema.validate(client, { abortEarly: false });
//       if (checkClient.error) {
//         const errors = errorGroup(checkClient);

//         return res.status(400).json({ error: errors });
//       }

//       const clientExist = await HotelResto.findOne({ where: { name: hotelResto.name } });
//       if (clientExist)
//         return res.status(409).json({
//           error: `${hotelResto.category} already registered`,
//         });
//       next();
//     } catch (error) {
//       return res.status(500).json({ error: 'server error' });
//     }
//   }
// }
// export default ClientValidation;
