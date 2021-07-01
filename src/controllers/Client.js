import model from '../db/models';
import { uploader } from '../middlewares/cloudinary';
import path from 'path';
import imageDataURI from 'image-data-uri';
import fs from 'fs';

const { Client } = model;

class ClientManager {
  static async registerClient(req, res) {
    try {
      const clientExist = await Client.findAll({ where: { name: req.body.name.toLowerCase() } });

      // check if client is already registered
      if (clientExist.length > 0)
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

      const file = req.files.contract[0];
      const fileName = `${Date.now()}-${req.body.name}-${file.originalname}`;
      const dataBuffer = new Buffer.from(file.buffer);

      await fs.writeFileSync(`${__dirname}/${fileName}`, dataBuffer, null);

      const contract = [fileName];

      req.body.name = req.body.name.toLowerCase();

      // save client's information to database
      const client = await Client.create({ ...req.body, images, contract });

      if (client)
        return res.status(201).send({
          message: `${req.body.category} added successful`,
        });
    } catch (error) {
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

  static async archieveClient(req, res) {
    try {
      const { clientId } = req.params;
      const clients = await Client.findOne({ where: { id: clientId } });

      if (clients.length === 0)
        return res.status(404).send({
          error: 'no client fund',
        });

      await Client.update(
        {
          status: 'archived',
        },
        { where: { id: clientId } },
      );

      return res.status(200).json({
        status: 200,
        message: 'client archived successfully!',
      });
    } catch (error) {
      return res.status(500).send({
        error: 'Server error',
      });
    }
  }

  static async updateClient(req, res) {
    const { clientId } = req.params;

    const {
      name,
      category,
      description,
      bouquet,
      status,
      province,
      district,
      sector,
      cell,
      village,
      googleMap,
      stars,
      registrationNumber,
      email,
      telephone,
      facebook,
      instagram,
      linkedIn,
      twitter,
      location,
    } = req.body;

    const clients = await Client.findAll({ where: { id: clientId } });

    if (clients.length === 0)
      return res.status(404).send({
        error: 'no client fund',
      });

    await Client.update(
      {
        name: name ? name : clients[0].dataValues.name,
        category: category ? category : clients[0].dataValues.details,
        description: description ? description : clients[0].dataValues.description,
        bouquet: bouquet ? bouquet : clients[0].dataValues.bouquet,
        status: status ? status : clients[0].dataValues.status,

        province: province ? province : clients[0].dataValues.province,
        district: district ? district : clients[0].dataValues.district,
        sector: sector ? sector : clients[0].dataValues.sector,
        cell: cell ? cell : clients[0].dataValues.cell,
        village: village ? village : clients[0].dataValues.village,

        email: email ? email : clients[0].dataValues.email,
        telephone: telephone ? telephone : clients[0].dataValues.telephone,
        facebook: facebook ? facebook : clients[0].dataValues.facebook,
        instagram: instagram ? instagram : clients[0].dataValues.instagram,
        twitter: twitter ? twitter : clients[0].dataValues.twitter,
        linkedIn: linkedIn ? linkedIn : clients[0].dataValues.linkedIn,

        stars: stars ? stars : clients[0].dataValues.stars,
        registrationNumber: registrationNumber
          ? registrationNumber
          : clients[0].dataValues.registrationNumber,

        googleMap: googleMap ? googleMap : clients[0].dataValues.googleMap,
        location: location ? location : clients[0].dataValues.location,
      },
      { where: { id: clientId } },
    );

    return res.status(200).json({
      status: 200,
      message: 'Client updated successfully!',
    });
  }
  catch(error) {
    return res.status(500).send({
      error: 'Server error',
    });
  }
}

export default ClientManager;
