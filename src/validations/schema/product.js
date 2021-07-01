import joi from 'joi';

export const productSchema = joi.object().keys({
  name: joi.string().min(2).required(),
  clientId: joi.string().required(),
  type: joi.string().required(),
  price: joi.number().required(),
  flag: joi.number().required(),
  groupId: joi.string().required(),
  categoryId: joi.string(),
  subCategoryId: joi.string(),
  currency: joi.string(),
  description: joi.string(),
  images: joi.array()
});
