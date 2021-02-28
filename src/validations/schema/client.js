import joi from 'joi';

export const clientSchema = joi.object().keys({
  name: joi.string().min(2).required(),
  category: joi.any().valid('hotel', 'resto'),
  description: joi.string().min(2).required(),
  location: joi.string().min(2).required(),
  bouquet: joi.any().valid('basic', 'moderate', 'premium'),
  status: joi.any().valid('active', 'inactive', 'dormant'),
});
