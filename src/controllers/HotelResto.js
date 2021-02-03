import model from '../db/models';
import { uploader } from '../middlewares/cloudinary';
import path from 'path';
import imageDataURI from 'image-data-uri';

const { HotelResto } = model;

class HotelRestoManager {
  static async registerHotelResto(req, res) {
    try {
      const images = [];

      // get all images from client request
      for (let image in req.files) {
        const dataBuffer = new Buffer.from(req.files[image].buffer);
        const mediaType = path.extname(req.files[image].originalname).toString();

        const imageData = imageDataURI.encode(dataBuffer, mediaType);
        const uploadedImage = await uploader.upload(imageData);
        images.push(uploadedImage.url);
      }

      // save hotel or resto information to database
      const hotelResto = await HotelResto.create({ ...req.body, images });
      return res.status(201).send({
        message: `${req.body.category} added successful`,
      });
    } catch (error) {
      return res.status(500).send({
        error: 'Server error',
        error
      });
    }
  }

  static async getAllHotelResto(req, res) {
    try {
      const hotelRestos = await HotelResto.findAll();
      if (hotelRestos.length === 0)
        return res.status(404).send({
          error: 'no hotel or resto fund',
        });

      return res.status(200).send({
        items: hotelRestos,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).send({
        error: 'Server error',
      });
    }
  }
}

export default HotelRestoManager;
