import joi from 'joi';

export const clientSchema = joi.object().keys({
  name: joi.string().min(2).required(),
  category: joi.any().valid('hotel', 'resto'),
  description: joi.string().min(5).max(200).required(),
  bouquet: joi.any().valid('basic', 'moderate', 'premium'),
  status: joi.any().valid('active', 'archived'),
  images: joi.array(),
  stars: joi.valid('N/A', '1', '2', '3', '4', '5'),
  registrationNumber: joi.number().required(),
  province: joi.string(),
  district: joi.string(),
  sector: joi.string(),
  cell: joi.string(),
  village: joi.string(),
  email: joi.string(),
  telephone: joi.string(),
  facebook: joi.string(),
  instagram: joi.string(),
  linkedIn: joi.string(),
  twitter: joi.string(),
  googleMap: joi.string(),
});
