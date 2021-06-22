import model from '../db/models';
import { uploader } from '../middlewares/cloudinary';
import path from 'path';
import imageDataURI from 'image-data-uri';
import fs from 'fs';

const { Client } = model;

class ClientManager {
  static async registerClient(req, res) {
    console.log("req.body", req.body);
    console.log("contract", req.files);
    try {
      const clientExist = await Client.findOne({ where: { name: req.body.name } });
      // // check if client is already registered
      if (clientExist)
        return res.status(409).send({
          error: 'client already registered',
        });

      const images = [];

      for (let image in req.files) {
        const dataBuffer = new Buffer.from(req.files.image[0].buffer);
        const mediaType = path.extname(req.files.image[0].originalname).toString();

        const imageData = imageDataURI.encode(dataBuffer, mediaType);
        const uploadedImage = await uploader.upload(imageData);
        images.push(uploadedImage.url);
      }

      // const file = req.files.contract[0];
      // const fileName = `${Date.now()}-${req.body.name}-${file.originalname}`;
      // const dataBuffer = new Buffer.from(file.buffer);

      // await fs.writeFileSync(
      //   `${__dirname}/${fileName}`,
      //   dataBuffer, null
      // );
    
      // const contract = [
      //     fileName
      // ]

      // save client's information to database
      // const client = await Client.create({ ...req.body, images, contract });
      const client = await Client.create({ ...req.body, images });
      if (client)
        return res.status(201).send({
          message: `${req.body.category} added successful`,
        });
    } catch (error) {
      console.log("reg client error ", error);
      return res.status(500).send({
        error: 'Server error',
        error,
      });
    }
  }

  static async getClients(req, res) {
    try {
      const clients = await Client.findAll();
      if (clients.length === 0)
        return res.status(404).send({
          error: 'no client fund',
        });

      return res.status(200).send({
        items: clients,
      });
    } catch (error) {
      return res.status(500).send({
        error: 'Server error',
      });
    }
  }
}

export default ClientManager;
